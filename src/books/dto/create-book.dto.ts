import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Category } from '../types/category.type';
import { MESSAGES } from 'src/common/constants/message.constant';

export class CreateBookDto {
  @IsNotEmpty({ message: MESSAGES.BOOK.TITLE.REQUIRED })
  @IsString({ message: MESSAGES.BOOK.TITLE.INVALID_FORMAT })
  @MaxLength(100, { message: MESSAGES.BOOK.TITLE.LENGTH_EXCEEDED })
  title: string;

  @IsNotEmpty({ message: MESSAGES.BOOK.AUTHOR.REQUIRED })
  @IsString({ message: MESSAGES.BOOK.AUTHOR.INVALID_FORMAT })
  @MaxLength(50, { message: MESSAGES.BOOK.AUTHOR.LENGTH_EXCEEDED })
  author: string;

  @IsNotEmpty({ message: MESSAGES.BOOK.PUBLISHER.REQUIRED })
  @IsString({ message: MESSAGES.BOOK.PUBLISHER.INVALID_FORMAT })
  @MaxLength(100, { message: MESSAGES.BOOK.PUBLISHER.LENGTH_EXCEEDED })
  publisher: string;

  @IsNotEmpty({ message: MESSAGES.BOOK.DESCRIPTION.REQUIRED })
  @IsString({ message: MESSAGES.BOOK.DESCRIPTION.INVALID_FORMAT })
  description: string;

  @IsNotEmpty({ message: MESSAGES.BOOK.CATEGORY.REQUIRED })
  @IsEnum(Category, { message: MESSAGES.BOOK.CATEGORY.INVALID_FORMAT })
  category: Category;

  @IsNotEmpty({ message: MESSAGES.BOOK.PAGE_COUNT.REQUIRED })
  @IsInt({ message: MESSAGES.BOOK.PAGE_COUNT.INVALID_FORMAT })
  pageCount: number;

  @IsNotEmpty({ message: MESSAGES.BOOK.PRICE.REQUIRED })
  @IsInt({ message: MESSAGES.BOOK.PRICE.INVALID_FORMAT })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: MESSAGES.BOOK.RATING.INVALID_FORMAT })
  @Max(5, { message: MESSAGES.BOOK.RATING.MAX })
  @Min(0, { message: MESSAGES.BOOK.RATING.MIN })
  rating: number;

  @IsNotEmpty({ message: MESSAGES.BOOK.STOCK_QUANTITY.REQUIRED })
  @IsInt({ message: MESSAGES.BOOK.STOCK_QUANTITY.INVALID_FORMAT })
  stockQuantity: number;

  @IsNotEmpty({ message: MESSAGES.BOOK.PUBLICATION_DATE.REQUIRED })
  @IsDateString({}, { message: MESSAGES.BOOK.PUBLICATION_DATE.INVALID_FORMAT })
  publicationDate: string;
}
