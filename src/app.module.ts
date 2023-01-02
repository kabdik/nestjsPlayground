import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./users/user";
import { UsersModule } from "./users/users.module";
import { RolesModule } from './roles/roles.module';
import { Roles } from "./roles/roles";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Posts } from "./posts/posts";
import { FilesModule } from './files/files.module';
@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User,Roles,Posts],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
