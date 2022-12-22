import { Roles } from "src/roles/roles";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    roles: Roles[];
    addRole(role: Roles): void;
}
