import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     //remove os campos que não estiverem no DTO do model
    forbidNonWhitelisted: true, //retorna os erro no react native
    transform: true,     //transforma os tipos automaticamente
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
