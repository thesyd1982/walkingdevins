import { IsEmail, IsString, IsEnum } from "class-validator";

export enum Role { VOLENTEER = "VOLENTEER", REFERENT = "REFERENT", MODERATOR = "MODERATOR", ORGANIZER = "ORGANIZER" }

export class CreateUserDto {
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;
    @IsEnum([Role.VOLENTEER, Role.REFERENT, Role.MODERATOR, Role.ORGANIZER], { message: 'Valid role required' })
    role: Role;
}
