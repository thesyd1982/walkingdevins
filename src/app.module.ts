import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TokensModule } from './tokens/tokens.module';
import { CommonModule } from './common/common.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivityModule } from './activity/activity.module';
import { MessagesModule } from './messages/messages.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        PostsModule,
        AuthModule,
        PrismaModule,
        TokensModule,
        CommonModule,
        TasksModule,
        ActivityModule,
        MessagesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
