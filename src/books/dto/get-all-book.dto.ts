import { PartialType, PickType } from '@nestjs/mapped-types';
import { AddNewBookDto } from './add-new-book.dto';

export class GetAllBookDto extends PartialType(
  PickType(AddNewBookDto, ['title', 'author'] as const),
) {}
