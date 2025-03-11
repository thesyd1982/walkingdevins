import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { IsBoolean, IsInt, IsObject, IsOptional } from 'class-validator';


export class QueryParamsTaskDto {

    @IsObject()
    @IsOptional()
    select?: Prisma.TaskSelect<DefaultArgs>;

    @IsObject()
    @IsOptional()
    include?: Prisma.TaskInclude<DefaultArgs>;

    @IsObject()
    @IsOptional()
    where?: Prisma.TaskWhereInput;

    @IsObject()
    @IsOptional()
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];

    @IsObject()
    @IsOptional()
    cursor?: Prisma.TaskWhereUniqueInput;

    @IsInt()
    take?: number;

    @IsInt()
    skip?: number;

    @IsBoolean()
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
}


