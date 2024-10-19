import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class FindBookDto extends PartialType(
  PickType(CreateBookDto, ['title', 'author'] as const),
) {}
