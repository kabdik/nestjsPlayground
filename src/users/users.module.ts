import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roles } from "src/roles/roles";
import { RolesModule } from "src/roles/roles.module";
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([User, Roles]), RolesModule],
    exports: [UsersService],
})
export class UsersModule {}
