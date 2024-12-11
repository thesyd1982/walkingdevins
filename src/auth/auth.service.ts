import { Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { SignupDto, SigninDto } from './dtos';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokensService: TokensService
    ) { }

    async signup(signupDto: SignupDto) {

        return this.usersService.create(signupDto)
    }

    async validateUser(email: string, password: string) {
        // find the user by email
        const user = await this.usersService.findOne(email)

        if (user && await argon.verify(user.password, password)) {
            // send back the user
            delete user.password
            return user
        }
        return null
    }

    async signin(signinDto: SigninDto) {
        const user = await this.usersService.findOne(signinDto.email)
        // generate the access token 
        const accessToken = await this.tokensService.signToken(user.id, user.email)
        // generate the refresh token 
        const refreshToken = await this.tokensService.signToken(user.id, user.email, 'refresh')
        this.tokensService.saveToken(user.id, refreshToken, 'refresh')

        return { access_token: accessToken, refresh_token: refreshToken }
    }

}
