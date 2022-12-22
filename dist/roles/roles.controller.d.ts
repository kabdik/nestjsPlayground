import { CreateRoleDto } from './dto/craeteRole.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(rolesDto: CreateRoleDto): Promise<import("./roles").Roles>;
    getAll(): Promise<import("./roles").Roles[]>;
    getByValue(value: string): Promise<import("./roles").Roles>;
}
