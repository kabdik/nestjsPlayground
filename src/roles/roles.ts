import { User } from "src/users/user";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Roles extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true,nullable:false})
    value:string

    @Column({nullable:true})
    description:string

    @ManyToMany(()=>User,(user)=>user.roles)
    users:User[]

}