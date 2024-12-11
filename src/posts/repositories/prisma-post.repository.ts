import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPostRepository } from './post.repository.interface';
import { CreatePostDto, QueryParamsPostDto, UpdatePostDto } from '../dto';
import { Post } from '@prisma/client';

@Injectable()
export class PrismaPostRepository implements IPostRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: CreatePostDto): Promise<Post> {
        return this.prisma.post.create({ data });
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

    async findOne(id: number): Promise<Post | null> {
        return this.prisma.post.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdatePostDto): Promise<Post> {
        return this.prisma.post.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.post.delete({ where: { id } });
    }
}
