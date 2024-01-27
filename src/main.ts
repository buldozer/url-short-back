import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API for URL Shortener Microservice')
    .addServer('http://localhost:3000/', 'Local environment')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  app.enableCors();

  const expressApp = express();
  expressApp.use(express.static(join(__dirname, '..', 'public')));
  app.use(expressApp);
  
  
  await app.listen(3000);

}
bootstrap();
