import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/craeteRole.dto";
import { Roles } from "./roles";
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Roles>);
    createRole(dto: CreateRoleDto): Promise<Roles>;
    getAllRoles(): Promise<Roles[]>;
    getRoleByValue(value: string): Promise<Roles>;
}
