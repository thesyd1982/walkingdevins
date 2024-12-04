import { Injectable } from '@nestjs/common';
type Role = 'VOLENTEER' | 'REFERENT' | 'MODERATOR' | 'ORGANIZER'
interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role
}
// All Optional But Id is required
type updateUserDto = Partial<Omit<User, 'id'>> & Pick<User, 'id'>

type createUserDto = Omit<User, 'id'>


@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'qGy9E@example.com',
            role: 'VOLUNTEER'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'g7oZG@example.com',
            role: 'REFERENT'
        },
        {
            id: 3,
            firstName: 'John',
            lastName: 'Smith',
            email: 'm2T4b@example.com',
            role: 'MODERATOR'
        },
        {
            id: 4,
            firstName: 'Jane',
            lastName: 'Smith',
            email: '7VZQ8@example.com',
            role: 'ORGANIZER'
        }

    ]

    findAll(role?: Role) {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }
    create(user: createUserDto) {
        const usersByHighestId = [...this.users].sort((a, z) => z.id - a.id)
        const newUser = { id: usersByHighestId[0].id + 1, ...user }
        this.users.push(newUser)
        return newUser
    }
    update(id: number, userUpdate: updateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id)
                return { ...user, ...userUpdate }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) { //
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }


}
