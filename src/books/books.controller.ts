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
import { AddNewBookDto } from './dto/add-new-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse } from './interfaces/api-response.interface';
import { Book } from './entities/book.entity';
import { MESSAGES } from 'src/common/constants/message.constant';
import { GetAllBookDto } from './dto/get-all-book.dto';

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
  updateBookById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBookById(+id, updateBookDto);
  }

  @Delete(':id')
  deleteBookById(@Param('id') id: string) {
    return this.booksService.deleteBookById(+id);
  }
}
