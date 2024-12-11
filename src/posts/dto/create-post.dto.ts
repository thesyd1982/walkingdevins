import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreatePostDto {
    // TODO add swagger and the annotations
    @IsString({ message: 'Title must be a string' })
    @MaxLength(255, { message: 'Title is too long' })
    title: string

    @IsString()
    content: string

    @IsOptional()
    published: boolean

    @IsOptional()
    @IsNumber()
    authorId: number
}
