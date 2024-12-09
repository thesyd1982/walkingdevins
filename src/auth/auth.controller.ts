import { Body, Controller, UnauthorizedException, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() authDto: AuthDto) {
        return this.authService.signup(authDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() authDto: AuthDto) {

        const user = await this.authService.validateUser(authDto.email, authDto.password)

        if (!user) throw new UnauthorizedException('Invalid credentials')
        return this.authService.signin(user)
    }
}
