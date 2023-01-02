import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {User} from "../users/user"
@Entity("posts")
export class Posts extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    title:string

    @Column()
    content:string

    @Column()
    image:string

    @ManyToOne(()=>User,(user)=>user.posts)
    author: User
}