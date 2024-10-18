import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot({isGloabal: true})
    BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
