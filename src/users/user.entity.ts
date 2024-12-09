export enum Role {
    VOLENTEER = 0,
    REFERENT = 1,
    MODERATOR = 2,
    ORGANIZER = 3,
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}
