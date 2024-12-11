import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaPostRepository } from './repositories';

@Module({
    imports: [UsersModule, PrismaModule],
    controllers: [PostsController],
    providers: [PostsService, {
        provide: 'IPostRepository',
        useClass: PrismaPostRepository
    },],
})
export class PostsModule { }
