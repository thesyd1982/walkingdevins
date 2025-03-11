import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaRepository } from 'src/prisma/repositories/prisma-generic.repository';
import { Task } from '@prisma/client';
import { CreateTaskDto, QueryParamsTaskDto, UpdateTaskDto } from '../dtos';
import { ITaskRepository } from '../interfaces';

@Injectable()
export class PrismaTaskRepository
    extends PrismaRepository<Task, CreateTaskDto, UpdateTaskDto, QueryParamsTaskDto>
    implements ITaskRepository {
    constructor(prisma: PrismaService) {
        super(prisma, 'task');
    }
}
