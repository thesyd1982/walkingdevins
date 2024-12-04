import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, Role, UpdateUserDTO } from './dto';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get() // GET /users or GET /users?roles=value
    findAll(@Query('role') role?: Role) {
        return this.usersService.findAll(role)
    }
    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }
    @Post() // POST /users
    create(@Body() user: CreateUserDTO) {

        return this.usersService.create(user)
    }
    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDTO) {
        return this.usersService.update(id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
