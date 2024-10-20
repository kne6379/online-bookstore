import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheModuleOptions } from 'src/configs/cache.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    CacheModule.register(cacheModuleOptions),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
