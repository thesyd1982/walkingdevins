import { Body, Controller, UnauthorizedException, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {

        const user = await this.authService.validateUser(signinDto.email, signinDto.password)

        if (!user) throw new UnauthorizedException('Invalid credentials')
        return this.authService.signin(user)
    }
}
