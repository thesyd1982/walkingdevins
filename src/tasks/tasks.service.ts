import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto, QueryParamsTaskDto } from './dtos';
import { ITaskRepository } from './interfaces';

@Injectable()
export class TasksService {

    constructor(@Inject('ITaskRepository') private taskRepository: ITaskRepository) { }
    create(createTaskDto: CreateTaskDto) {

        return this.taskRepository.create(createTaskDto)
    }

    findAll(queryParamsTaskDto: QueryParamsTaskDto) {
        return this.taskRepository.findAll(queryParamsTaskDto)
    }

    findOne(id: number) {
        return this.taskRepository.findOne(id)
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
        return this.taskRepository.update(id, updateTaskDto)
    }

    remove(id: number) {
        return this.taskRepository.delete(id)
    }
}
