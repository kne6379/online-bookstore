import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AddNewBookDto } from './dto/add-new-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { MESSAGES } from 'src/common/constants/message.constant';
import { GetAllBookDto } from './dto/get-all-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // 도서 등록
  async addNewBook(addNewBookDto: AddNewBookDto): Promise<Book> {
    // 도서 정보를 데이터베이스에 저장
    const data = await this.bookRepository.save(addNewBookDto);

    // 도서가 정상적으로 등록되지 않았을 경우 예외 처리
    if (!data) {
      throw new NotFoundException(MESSAGES.BOOK.ERROR.CREATED_FAILED);
    }
    return data;
  }

  // 도서 조회
  async getAllBooks(getAllBookDto: GetAllBookDto): Promise<Book[]> {
    // DTO에서 받은 title과 author 값을 추출하여 캐시 키를 생성
    const { title, author } = getAllBookDto;
    const cacheKey =
      Object.keys(getAllBookDto).length === 0
        ? `books:all`
        : `books:${title || ''}:${author || ''}`;

    // 캐시에 데이터가 있는지 확인
    let data = await this.cacheManager.get<Book[]>(cacheKey);

    // 캐시에 데이터가 없으면 DB에서 조회 후 캐시에 저장
    if (!data) {
      data = await this.bookRepository.find({
        where: getAllBookDto,
      });
      await this.cacheManager.set(cacheKey, data);
    }

    // 조회된 데이터가 없거나 비어있으면 예외 처리
    this.validateDataNotEmpty(data);

    return data;
  }

  // 도서 상세 조회
  async getBookById(id: number): Promise<Book> {
    // ID 값이 유효한지 검사 (숫자인지 여부 확인)
    this.validateId(id);

    // 캐시 키 생성
    const cacheKey = `book:${id}`;

    // 캐시에서 데이터 조회 (캐시에서 해당 책 데이터를 찾음)
    let data = await this.cacheManager.get<Book>(cacheKey);

    // 캐시에 데이터가 없을 경우 DB에서 조회하고 캐시에 저장
    if (!data) {
      data = await this.findBookOrFail(id);
      await this.cacheManager.set(cacheKey, data);
    }
    return data;
  }

  // 도서 정보 수정
  async updateBookById(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<{ updateFields: string[] }> {
    // ID 값이 유효한지 검사 (숫자인지 여부 확인)
    this.validateId(id);

    // 도서가 존재하는지 확인, 존재하지 않으면 예외 발생
    await this.findBookOrFail(id);

    // 도서 정보 업데이트
    await this.bookRepository.update({ id }, updateBookDto);

    await this.clearAllCache();

    // 업데이트된 필드 목록 반환
    return { updateFields: Object.keys(updateBookDto) };
  }

  // 도서 삭제
  async deleteBookById(id: number): Promise<{ deletedBookId: number }> {
    // ID 값이 유효한지 검사 (숫자인지 여부 확인)
    this.validateId(id);

    // 도서가 존재하는지 확인, 존재하지 않으면 예외 발생
    await this.findBookOrFail(id);

    // 도서 삭제
    const result = await this.bookRepository.delete({ id });

    // 삭제된 항목이 없을 경우 예외 처리
    if (result.affected === 0) {
      throw new BadRequestException(MESSAGES.BOOK.ERROR.DELETE_FAILED);
    }

    await this.clearAllCache();

    // 삭제된 도서의 ID 반환
    return { deletedBookId: +id };
  }

  // 주어진 ID에 해당하는 도서를 조회, 없을 시 예외 발생
  async findBookOrFail(id: number): Promise<Book> {
    const data = await this.bookRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(MESSAGES.BOOK.FAILED.BOOK_NOT_FOUND);
    }
    return data;
  }

  // 전체 도서 캐시를 초기화하는 메서드
  async clearAllCache(): Promise<void> {
    const cacheKey = `books:all`;
    const data = await this.bookRepository.find();

    this.validateDataNotEmpty(data);

    // 캐시 초기화 (기존 캐시 데이터 모두 삭제)
    await this.cacheManager.reset();
    // 새로운 전체 도서 목록을 캐시에 저장
    await this.cacheManager.set(cacheKey, data);
  }

  // id가 유효한 숫자인지 검사 (NaN 여부 확인)
  validateId(id: number): void {
    if (isNaN(id)) {
      throw new BadRequestException(MESSAGES.COMMON.ERROR.INVALID_ID);
    }
  }

  // 조회된 데이터가 없거나 비어있으면 예외 처리
  validateDataNotEmpty(data: Book[]): void {
    if (!data || data.length === 0) {
      throw new NotFoundException(MESSAGES.BOOK.FAILED.NO_BOOK_FOUND);
    }
  }
}
