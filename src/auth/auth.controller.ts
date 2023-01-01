import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    async login(@Body() userDto: LoginDto) {
        return await this.authService.login(userDto);
    }

    @Post("/registration")
    async registration(@Body() userDto: CreateUserDto) {
        return await this.authService.registration(userDto);
    }
}
