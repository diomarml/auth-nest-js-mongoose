import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username?: string, email?: string, password?: string): Promise<any> {
    const user = await this.usersService.findOne(username, email)

    if (user == null) {
      throw new UnauthorizedException(`username or password is not matched`)
    }

    const passwordExists = await bcrypt.compare(password, user[0].password)
    if (passwordExists) {
      return user
    }
    return null

  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const { _id, role, status, email, username, createdAt  } = user
    return {
      user: {
        _id,
        role,
        status,
        email,
        username,
        createdAt,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}