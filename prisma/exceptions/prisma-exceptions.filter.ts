import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        switch (exception.code) {
            case 'P2002': // Unique constraint violation
                statusCode = HttpStatus.CONFLICT;
                message = 'A record with this value already exists.';
                break;
            case 'P2025': // Record not found
                statusCode = HttpStatus.NOT_FOUND;
                message = 'The requested record was not found.';
                break;
        }

        response.status(statusCode).json({
            statusCode,
            message,
            error: exception.meta?.target || 'Database error',
        });
    }
}

