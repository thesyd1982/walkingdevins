import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from './entities/user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll(role?: Role) {
        const users = await this.prisma.user.findMany({
            where: role ? { role } : undefined
        });
        if (users.length === 0) throw new NotFoundException('No users found');
        return users;
    }

    async findOne(uniqueKey: number | string) {
        const isEmail = typeof uniqueKey === 'string'
        const user = await this.prisma.user.findUnique({ where: isEmail ? { email: uniqueKey } : { id: uniqueKey } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async create(createUserDto: CreateUserDto) {

        try {
            const argon2Options = {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                timeCost: 3,
                parallelism: 1
            }

            // generate the password hash
            const hashedPassword = await argon2.hash(createUserDto.password, argon2Options)

            // save the new user in the db
            const newUser = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword
                }
            })
            delete newUser.password
            // return the new user
            return newUser
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.log(error)
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto
        });
    }

    async delete(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
