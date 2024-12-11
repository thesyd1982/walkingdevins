import { ApiProperty } from "@nestjs/swagger";

export enum Role {
    VOLENTEER = 0,
    REFERENT = 1,
    MODERATOR = 2,
    ORGANIZER = 3,
}

export class User {
    id: number;
    @ApiProperty()
    lastname: string;
    @ApiProperty()
    firstname: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    role: Role;
}
