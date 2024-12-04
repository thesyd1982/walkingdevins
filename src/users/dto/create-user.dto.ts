export type Role = 'VOLENTEER' | 'REFERENT' | 'MODERATOR' | 'ORGANIZER'

export class CreateUserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}
