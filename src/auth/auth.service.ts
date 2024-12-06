import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }
    async signup(authDto: AuthDto) {
        try {
            // generate the password hash
            const hash = await argon.hash(authDto.password)

            // save the new user in the db
            const newUser = await this.prisma.user.create({
                data: {
                    ...authDto,
                    password: hash
                }
            })
            delete newUser.password
            // return the new user
            return newUser
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async signin(authDto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({ where: { email: authDto.email } })

        // if user doesn't exist throw exception
        if (!user) throw new ForbiddenException('Credentials incorrect')

        // compare the password 
        const pwdMatches = await argon.verify(user.password, authDto.password)
        // if the password is wrong throw exception

        if (!pwdMatches)
            throw new ForbiddenException('Credentials incorrect')

        // send back the user 
        delete user.password
        return user
    }
}
