import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private config: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("token required");
        }

        // if the token is not valid retrive the refresh token

        // if the refresh token is not valid return 401

        // if the refresh token is valid return the new access token

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.config.get('JWT_SECRET'),
                }
            );
            request['user'] = payload;

            // const refreshToken = this.extractTokenFromCookie(request);
            // if (!refreshToken) {
            //     throw new UnauthorizedException();
            // }



        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.['refreshToken'];
    }
}
