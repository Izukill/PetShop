import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     //remove os campos que não estiverem no DTO do model
    forbidNonWhitelisted: true, //retorna os erro no react native
    transform: true,     //transforma os tipos automaticamente
  }));

  app.enableCors();

  //configuração do swagger
  
  const config = new DocumentBuilder()
    .setTitle('API PetShop (MVP)')
    .setDescription('Sistema de Gerênciamento de PetShop')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
