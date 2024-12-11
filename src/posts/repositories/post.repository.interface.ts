import { Post } from "@prisma/client";
import { CreatePostDto, UpdatePostDto, QueryParamsPostDto } from "../dto";

export interface IPostRepository {
    create(data: CreatePostDto): Promise<Post>;
    findAll(params: QueryParamsPostDto): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    update(id: number, data: UpdatePostDto): Promise<Post>;
    delete(id: number): Promise<void>;
}
