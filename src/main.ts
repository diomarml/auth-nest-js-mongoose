import { NestFactory } from '@nestjs/core';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}));
  app.enableCors();
  app.use(compression());
  app.use(helmet())
  await app.listen(3000);
 
  

}
bootstrap();
