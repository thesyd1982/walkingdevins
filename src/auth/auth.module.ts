import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { TokenService } from 'src/tokens/token.service';

@Module({
    imports: [PrismaModule, JwtModule.register({}), UsersModule],
    providers: [AuthService, TokenService],
    controllers: [AuthController]
})
export class AuthModule { }
