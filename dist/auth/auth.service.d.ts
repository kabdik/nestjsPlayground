import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    login(userDto: CreateUserDto): Promise<void>;
    registration(userDto: CreateUserDto): Promise<void>;
}
