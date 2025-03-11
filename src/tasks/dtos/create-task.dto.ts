import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
