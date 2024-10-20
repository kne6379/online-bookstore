import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheModuleOptions } from 'src/configs/cache.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerModuleOptions } from 'src/configs/throttler.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    CacheModule.register(cacheModuleOptions),
    ThrottlerModule.forRoot([throttlerModuleOptions]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class BooksModule {}
