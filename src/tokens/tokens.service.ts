import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokensService {
    constructor(private jwt: JwtService,
        private config: ConfigService,
        private prismaService: PrismaService,
        private usersSerice: UsersService
    ) { }

    signToken(userId: number, tokenType?: string): Promise<string> {
        let expiresIn = 15 * 60 * 1000
        let secret = this.config.get('JWT_SECRET')

        if (tokenType === 'refresh') {
            expiresIn = 24 * 60 * 60 * 1000
            secret = this.config.get('JWT_REFRESH_SECRET')
        }

        const payload = { sub: userId, iat: Date.now() }
        return this.jwt.signAsync(payload, { expiresIn, secret: this.config.get('JWT_SECRET') })
    }

    async validateToken(token: string, tokenType?: string) {
        if ('refresh' === tokenType) {
            return this.jwt.verifyAsync(token, { secret: this.config.get('JWT_REFRESH_SECRET') })
        }
        return this.jwt.verifyAsync(token, { secret: this.config.get('JWT_SECRET') })
    }

    async saveToken(token: string, tokenType: string) {

        if (tokenType === 'refresh') {
            const payload = await this.validateToken(token, 'refresh')
            if (!payload) return false

            const user = await this.usersSerice.findOne(payload.userId)
            const hashedRefreshToken = await argon.hash(token)

            this.prismaService.refreshToken.create(

                {
                    data: {
                        expireAt: payload.expiresIn,
                        hashedToken: hashedRefreshToken,
                        User: {
                            connect: { id: user.id }
                        }
                    }
                }
            )
        }

    }
}
