import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AddNewBookDto } from './dto/add-new-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse } from './interfaces/api-response.interface';
import { Book } from './entities/book.entity';
import { MESSAGES } from 'src/common/constants/message.constant';
import { GetAllBookDto } from './dto/get-all-book.dto';
import { DeleteResult } from 'typeorm';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/')
  async addNewBook(
    @Body() addNewBookDto: AddNewBookDto,
  ): Promise<ApiResponse<Book>> {
    const data = await this.booksService.addNewBook(addNewBookDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.CREATED,
      data,
    };
  }

  @Get('/')
  async getAllBooks(
    @Query() getAllBookDto: GetAllBookDto,
  ): Promise<ApiResponse<Book[]>> {
    const data = await this.booksService.getAllBooks(getAllBookDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.FOUND_ALL,
      data,
    };
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<ApiResponse<Book>> {
    const data = await this.booksService.getBookById(+id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.FOUND_ONE,
      data,
    };
  }

  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<ApiResponse<{ updateFields: string[] }>> {
    const data = await this.booksService.updateBookById(+id, updateBookDto);

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.UPDATED,
      data,
    };
  }

  @Delete(':id')
  async deleteBookById(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ deletedBookId: number }>> {
    const data = await this.booksService.deleteBookById(+id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.BOOK.SUCCESS.DELETED,
      data,
    };
  }
}
