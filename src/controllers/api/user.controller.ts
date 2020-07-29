import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { UserService } from "src/service/user/user.service";
import { User } from "entities/user.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { UserDto } from "src/dtos/user/add.user.dto";
import { EditPasswordUserDto } from "src/dtos/user/editPassword.user.dto";

@Controller('api/user')
export class UserController {
    constructor(
        private user: UserService
    ){}

    @Get()
    getAll(): Promise<User[]> {
        return this.user.getAll();
    }

    @Get(':id')
    getById(@Param('id') id:number) {
        return this.user.getById(id);
    }

    @Get('/email/:id')
    getOnlyEmail(@Param('id') id:number ): Promise<string | ApiResponse> {
        return this.user.getOnlyEmail(id);
    }

    @Put()
    add(@Body() data: UserDto): Promise<User | ApiResponse> {
        return this.user.add(data);
    }

    @Post('/password/:id')
    editPassword(@Param('id') id: number, @Body() data: EditPasswordUserDto): Promise <User | ApiResponse> {
        return this.user.editPassword(id,data);
    }

}