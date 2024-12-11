import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwt: JwtService, private config: ConfigService) { }

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
