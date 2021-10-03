import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(16)
    password: string;


    @IsNotEmpty()
    @IsIn(['Admin', 'Standard'])
    role: string;
}