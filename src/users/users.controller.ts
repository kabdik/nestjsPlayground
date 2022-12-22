import { Body, Controller } from "@nestjs/common";
import { Get, Post } from "@nestjs/common/decorators";
import { getDataSourceToken } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() userDto: CreateUserDto) {
        return await this.usersService.createUser(userDto);
    }

    @Get()
    async getAll() {
        return await this.usersService.getAllUsers();
    }
}
