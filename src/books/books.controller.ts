import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse } from './interfaces/api-response.interface';
import { Book } from './entities/book.entity';
import { MESSAGES } from 'src/constants/message.constant';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<ApiResponse<Book>> {
    const data = await this.booksService.createBook(createBookDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.CREATED,
      data,
    };
  }

  @Get('/')
  async findAll(): Promise<ApiResponse<Book[]>> {
    const data = await this.booksService.findAllBooks();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.FOUND_ALL,
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
