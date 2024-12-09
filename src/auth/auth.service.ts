import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
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

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        // find the user by email
        const user = await this.prisma.user.findUnique({ where: { email: email } })

        if (user && await argon.verify(user.password, password)) {
            // send back the user
            delete user.password
            return user
        }
        return null
    }

    async signin(user: Omit<User, 'password'>) {
        // generate the access token 
        const accessToken = await this.signToken(user.id, user.email)
        // generate the refresh token 
        const refreshToken = await this.signToken(user.id, user.email, 'refresh')
        this.saveToken(user.id, refreshToken, 'refresh')

        return { access_token: accessToken, refresh_token: refreshToken }
    }

    signToken(userId: number, email: string, tokenType?: string): Promise<string> {
        let expiresIn = 15 * 60 * 1000
        let secret = this.config.get('JWT_SECRET')

        if (tokenType === 'refresh') {
            expiresIn = 24 * 60 * 60 * 1000
            secret = this.config.get('JWT_REFRESH_SECRET')
        }

        const payload = { sub: userId, email, iat: Date.now() }
        return this.jwt.signAsync(payload, { expiresIn, secret: this.config.get('JWT_SECRET') })
    }

    saveToken(userId: number, token: string, tokenType: string) {

        if (tokenType === 'reset') console.log("save reset token", userId, token)
        if (tokenType === 'refresh') { console.log("save refresh token", userId, token) }

    }
}
