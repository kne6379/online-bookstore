import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}
  async addNewBook(addNewBookDto: AddNewBookDto): Promise<Book> {
    try {
      const data = await this.bookRepository.save(addNewBookDto);
      if (!data) {
        throw new NotFoundException(MESSAGES.BOOK.ERROR.CREATED_FAILED);
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        MESSAGES.COMMON.ERROR.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllBooks(getAllBookDto: GetAllBookDto): Promise<Book[]> {
    const data = await this.bookRepository.find({
      where: getAllBookDto,
    });

    if (!data || data.length === 0) {
      throw new NotFoundException(MESSAGES.BOOK.FAILED.NO_BOOK_FOUND);
    }

    return data;
  }

  async getBookById(id: number): Promise<Book> {
    await this.validateId(id);

    const data = await this.bookRepository.findOne({ where: { id } });

    if (!data) {
      throw new NotFoundException(MESSAGES.BOOK.FAILED.NO_BOOK_FOUND);
    }
    return data;
  }

  updateBookById(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  deleteBookById(id: number) {
    return `This action removes a #${id} book`;
  }

  // id가 NaN값인지 검사
  async validateId(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException(MESSAGES.COMMON.ERROR.INVALID_ID);
    }
  }
}
