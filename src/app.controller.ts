import { Body, Controller, Get, Param, Post, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {


    constructor(private appService: AppService) { }


    @Get("") // GET /  
    findAll() {
        return this.appService.findAll()
    }

    // id 1

    // @Get("/:id")
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     const message = this.appService.findOne(id)
    //     if (!message) throw new NotFoundException('message not found')
    //     return message
    // }

    @Post()
    create(@Body() body: any) {
        const { id, title, content } = body
        return this.appService.create(id, title, content)
    }
}

