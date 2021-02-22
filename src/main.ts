import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app);
  app.enableCors();
  await app.listen(3000);
  Logger.log(`Server is running on ${await app.getUrl()}`);
}
bootstrap();
