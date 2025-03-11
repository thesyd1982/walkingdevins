import { ICRUDRepository } from "src/common/interfaces/crud-repository.interface";
import { CreateTaskDto, UpdateTaskDto, QueryParamsTaskDto } from "../dtos";
import { Task } from "@prisma/client";

export interface ITaskRepository extends ICRUDRepository<Task, CreateTaskDto, UpdateTaskDto, QueryParamsTaskDto> {
    //add task's specific methods
}
