import { IsOptional, IsInt, IsString, IsBoolean, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryParamsPostDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    size?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    published?: boolean = false;

    @IsOptional()
    @IsString()
    authorId?: number;

    @IsOptional()
    @IsString()
    @IsIn(['createdAt', 'title'])
    sortBy?: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'asc';
}
