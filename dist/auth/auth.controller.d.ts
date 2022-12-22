import { CreateUserDto } from "src/users/dto/createUser.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<void>;
    registration(userDto: CreateUserDto): Promise<void>;
}
