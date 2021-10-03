import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../local-auth.guard'
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    create(@Body() createUserDto: createUserDto) {
        return this.usersService.create(createUserDto);
    }
}
