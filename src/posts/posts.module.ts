import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaPostRepository } from './repositories';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [UsersModule, PrismaModule, AuthModule, ConfigModule,],
    controllers: [PostsController],
    providers: [PostsService, {
        provide: 'IPostRepository',
        useClass: PrismaPostRepository
    },
    ],

})
export class PostsModule { }
