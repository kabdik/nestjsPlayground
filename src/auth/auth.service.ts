import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import {
    HttpException,
    UnauthorizedException,
} from "@nestjs/common/exceptions";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/user";
import { JwtService } from "@nestjs/jwt";
import { identity } from "rxjs";
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return await this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        console.log(process.env.PRIVATE_KEY);

        if (candidate) {
            throw new HttpException(
                "There is already user with this email",
                HttpStatus.BAD_REQUEST
            );
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });
        return await this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({
                message: "Wrong email or password",
            });
        }

        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password
        );

        if (!passwordEquals) {
            throw new UnauthorizedException({
                message: "Wrong email or password",
            });
        }
        return user;
    }
}
