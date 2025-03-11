import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaRepository } from 'src/prisma/repositories/prisma-generic.repository';
import { Post } from '@prisma/client';
import { CreatePostDto, QueryParamsPostDto, UpdatePostDto } from '../dtos';
import { IPostRepository } from '../interfaces';

@Injectable()
export class PrismaPostRepository
    extends PrismaRepository<Post, CreatePostDto, UpdatePostDto, QueryParamsPostDto>
    implements IPostRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, 'post');
    }

    async findAll(params: QueryParamsPostDto): Promise<Post[]> {

        const { page = 1, size = 10, title, published, authorId, sortBy, sortOrder } = params;

        const skip = (page - 1) * size;
        const take = size;

        const where = {
            title: { contains: title, mode: 'insensitive' },
            published,
            authorId,
        };

        const orderBy = { [sortBy]: sortOrder || 'asc' }

        return this.prisma.post.findMany({
            where,
            skip,
            take,
            orderBy,
        });
    }
}

