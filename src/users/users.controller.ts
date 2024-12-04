import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
type Role = 'VOLENTEER' | 'REFERENT' | 'MODERATOR' | 'ORGANIZER'
interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role
}
// All Optional But Id is required
type updateUserDto = Partial<Omit<User, 'id'>> & Pick<User, 'id'>

type createUserDto = Omit<User, 'id'>

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get() // GET /users or GET /users?roles=value
    findAll(@Query('role') role?: Role) {
        return this.usersService.findAll(role)
    }
    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }
    @Post() // POST /users
    create(@Body() user: createUserDto) {

        return this.usersService.create(user)
    }
    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: updateUserDto) {
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
