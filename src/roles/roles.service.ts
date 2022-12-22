import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/craeteRole.dto";
import { Roles } from "./roles";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>
    ) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.rolesRepository.save(dto) as Roles;
        return role
    }

    async getAllRoles(){
        const roles=await this.rolesRepository.find()
        return roles
    }

    async getRoleByValue(value:string){
        const role=await this.rolesRepository.findOne({where:{value}})
        return role
    }
}
