import { Roles } from "src/roles/roles";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from "typeorm";
@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: false })
    banned: boolean;

    @Column({ nullable: true })
    banReason: string;

    @ManyToMany(() => Roles, (role) => role.users, { cascade: true })
    @JoinTable({
        name: "user_roles",
        joinColumn: {
            name: "roleId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "userId",
            referencedColumnName: "id",
        },
    })
    roles: Roles[];

    addRole(role:Roles){
        if (this.roles===null){
            console.log("enetered");
            
            this.roles=Array<Roles>()
        }
        this.roles.push(role)
    }
}
