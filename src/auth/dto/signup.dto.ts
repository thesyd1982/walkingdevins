import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/users/entities/user.entity";
export class SignupDto {
    @IsOptional()
    @IsString({ message: 'First name must be a string' })
    firstname: string;

    @IsOptional()
    @IsString({ message: 'Last name must be a string' })
    lastname: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    // TODO: add regex for capital, special chars and numbers
    password: string;

    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsOptional()
    @IsEnum(Role, { message: 'Valid role required' })
    role?: Role = Role.VOLENTEER;
}
