import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { MESSAGES } from 'src/constants/message.constant';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const data = await this.bookRepository.save(createBookDto);
    if (!data) {
      throw new NotFoundException(MESSAGES.BOOK.ERROR.CREATED_FAILED);
    }
    return data;
  }

  async findAllBooks(): Promise<Book[]> {
    const data = await this.bookRepository.find();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
