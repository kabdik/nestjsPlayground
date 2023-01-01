import { Body, Controller } from "@nestjs/common";
import { Get, Param, Post, Req, UseGuards } from "@nestjs/common/decorators";
import { getDataSourceToken } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/jwtAuth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/rolesAuth.decorator";
import { addRoleDto } from "src/roles/dto/addRole.dto";
import { banUserDto } from "./dto/banUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Req() req) {
        console.log(req.user);

        return this.usersService.getAllUsers();
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    async addRole(@Body() addRoleDto:addRoleDto){
        return this.usersService.addRole(addRoleDto)
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    async ban(@Body() banUserDto:banUserDto){
        return this.usersService.banUser(banUserDto)
    }
}
