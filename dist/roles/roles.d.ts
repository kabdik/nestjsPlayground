import { User } from "src/users/user";
import { BaseEntity } from "typeorm";
export declare class Roles extends BaseEntity {
    id: number;
    value: string;
    description: string;
    users: User[];
}
