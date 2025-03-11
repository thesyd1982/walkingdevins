import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { QueryParamsPostDto, CreatePostDto, UpdatePostDto } from './dtos';
import { AuthGuard } from 'src/auth/guards';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll(@Query() qs: QueryParamsPostDto) {
        return this.postsService.findAll(qs);

    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.delete(id);
    }
}
