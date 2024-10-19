import { PartialType } from '@nestjs/mapped-types';
import { AddNewBookDto } from './add-new-book.dto';

export class UpdateBookDto extends PartialType(AddNewBookDto) {}
