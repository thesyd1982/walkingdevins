import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        UsersModule,
        TokensModule

    ],
    providers: [
        AuthService,
    ],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule { }
