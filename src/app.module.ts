import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './auth/users/users.controller';

@Module({
  imports: [ 
            ConfigModule.forRoot({isGlobal: true},),
            AuthModule,
            UsersModule,
            MongooseModule.forRoot(process.env.MONGO_URL)
            ],
  controllers: [AppController,UsersController],
  providers: [AppService],
})
export class AppModule {}
