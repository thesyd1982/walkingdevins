import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [JwtModule.register({}), PrismaModule, UsersModule],

    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule { }
