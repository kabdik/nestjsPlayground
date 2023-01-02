import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { addRoleDto } from "src/roles/dto/addRole.dto";
import { Roles } from "src/roles/roles";
import { RolesService } from "src/roles/roles.service";
import { Repository } from "typeorm";
import { banUserDto } from "./dto/banUser.dto";
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
        const role = await this.roleService.getRoleByValue("admin");
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

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: {
                roles: true,
                posts: true,
            },
        });
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { posts: true },
        });
        return user
    }

    async addRole(addRoleDto: addRoleDto) {
        const user = await this.userRepository.findOne({
            where: { id: addRoleDto.userId },
            relations: { roles: true },
        });
        console.log(user);
        const role = await this.roleService.getRoleByValue(addRoleDto.value);
        console.log(role);
        if (!user || !role) {
            throw new HttpException("Wrong input data", HttpStatus.BAD_REQUEST);
        }
        user.addRole(role);
        await user.save();
        return user;
    }

    async banUser(banUserDto: banUserDto) {
        const user = await this.userRepository.findOne({
            where: { id: banUserDto.id },
        });
        if (!user) {
            throw new HttpException(
                "There is no user with such id",
                HttpStatus.NOT_FOUND
            );
        }
        user.banned = true;
        user.banReason = banUserDto.banReason;
        await user.save();
        return user;
    }
}
