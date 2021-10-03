import { ConflictException, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from '../../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './users.interface';


// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<IUser>) { }



  async findOne(username: string, email: string): Promise<any> {
    const user = await this.userModel.find({
      $or: [
        { 'username': username },
        { 'email': email }
      ]
    });

    if (!user) {
      return null
    }
    return user
  }


  async create(createUserDto: createUserDto): Promise<IUser> {

    const { name, username, email } = createUserDto;
    const alreadyExists = await this.userModel.find({
      $or: [
        { 'username': username },
        { 'email': email }
      ]
    });

    if (alreadyExists.length != 0) {
      throw new ConflictException(`User already exists`)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    const createdUserCopy = { ...createdUser.toObject() };

    delete createdUserCopy.password;
    delete createdUserCopy.__v;
    const payload = {
      username: createdUser.username,
      sub: createdUser._id,
    };

    return createdUserCopy;

  }

}