import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaTaskRepository } from './repositories';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [TasksController],
    providers: [TasksService, { provide: 'ITaskRepository', useClass: PrismaTaskRepository }],
})
export class TasksModule { }
