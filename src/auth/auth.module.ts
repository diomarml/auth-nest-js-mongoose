import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

  

@Module({
  imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async(configService: ConfigService) => ({
            secret: configService.get<string>('KEY_SECRET'),
            signOptions: { expiresIn: '72h'},
          }),
          inject:[ConfigService]
        }),
      ],
  providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
      ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
