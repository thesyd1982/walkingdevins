import { Post } from "@prisma/client";
import { CreatePostDto, UpdatePostDto, QueryParamsPostDto } from "../dtos";
import { ICRUDRepository } from "src/common/interfaces/crud-repository.interface";

export interface IPostRepository extends ICRUDRepository<Post, CreatePostDto, UpdatePostDto, QueryParamsPostDto> {

    // Here We can add additional methods specific to Post
}
