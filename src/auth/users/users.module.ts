import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../../schemas/user.schema'
import { IUser  } from '../users/users.interface'
import * as bcrypt from 'bcrypt';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
                                      name: User.name,
                                      useFactory: () => {
                                        const schema = UserSchema;
                                     
                                        return schema;
                                      },
                                       }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
