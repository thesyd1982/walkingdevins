import { PrismaClient } from '@prisma/client';
import { ICRUDRepository } from '../../common/interfaces/crud-repository.interface';

export class PrismaRepository<T, CreateDto, UpdateDto, QueryParamsDto> implements ICRUDRepository<T, CreateDto, UpdateDto, QueryParamsDto> {
    private readonly prismaModel: any;

    constructor(private readonly prisma: PrismaClient, model: keyof PrismaClient) {
        this.prismaModel = prisma[model]; // Utilisation explicite pour éviter les erreurs liées à l'indexation dynamique.
    }

    async create(data: CreateDto): Promise<T> {
        return this.prismaModel.create({ data });
    }

    async findOne(id: string | number): Promise<T | null> {
        return this.prismaModel.findUnique({ where: { id } });
    }

    async findAll(params: QueryParamsDto): Promise<T[]> {
        return this.prismaModel.findMany();
    }

    async update(id: string | number, data: UpdateDto): Promise<T> {
        return this.prismaModel.update({ where: { id }, data });
    }

    async delete(id: string | number): Promise<void> {
        await this.prismaModel.delete({ where: { id } });
    }
}
