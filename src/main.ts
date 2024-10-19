import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(SERVER_PORT);
}
bootstrap();
