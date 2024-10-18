import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT');

  await app.listen(SERVER_PORT);
}
bootstrap();
