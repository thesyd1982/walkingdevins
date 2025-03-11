import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto, QueryParamsPostDto } from './dtos';
// import { UsersService } from '../users/users.service';
import { IPostRepository } from './interfaces';

@Injectable()
export class PostsService {
    constructor(/* private usersService: UsersService, */
        @Inject('IPostRepository') private postRepository: IPostRepository) { }

    create(createPostDto: CreatePostDto) {

        return this.postRepository.create(createPostDto)
    }

    findAll(queryParamsPostDto: QueryParamsPostDto) {
        return this.postRepository.findAll(queryParamsPostDto)
    }

    findOne(id: number) {
        return this.postRepository.findOne(id)
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.postRepository.update(id, updatePostDto)
    }

    delete(id: number) {
        this.postRepository.delete(id)
    }
    finByEmail() { }
}
