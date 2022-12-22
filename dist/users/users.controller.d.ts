import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto): Promise<import("./user").User>;
    getAll(): Promise<import("./user").User[]>;
}
