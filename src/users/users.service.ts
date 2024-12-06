import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, Role, UpdateUserDto } from './dto';
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
            const filteredUsers = this.users.filter(user => user.role === role)
            if (filteredUsers.length === 0) throw new NotFoundException('No users found')
            return filteredUsers

        }
        return this.users
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) return new NotFoundException('User not found')
        return user
    }
    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, z) => z.id - a.id)
        const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto }
        this.users.push(newUser)
        return newUser
    }
    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id)
                return { ...user, ...updateUserDto }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }


}
