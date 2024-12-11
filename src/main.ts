import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaExceptionFilter } from 'prisma/exceptions/prisma-exceptions.filter';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }))

    app.useGlobalFilters(new PrismaExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('Walking devins')
        .setDescription('The walkingdevins  API description')
        .setVersion('1.0')
        .addTag('walkingdevis')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(3000);
}
bootstrap();
