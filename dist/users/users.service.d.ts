import { RolesService } from "src/roles/roles.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user";
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: Repository<User>, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
