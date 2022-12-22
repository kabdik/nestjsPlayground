import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/roles/roles";
import { RolesService } from "src/roles/roles.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("user");
        user.addRole(role);
        await this.userRepository.save(user);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: {
                roles: true,
            },
        });
        return users;
    }
}
