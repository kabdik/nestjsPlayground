import { Injectable, Scope } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { FilesService } from "src/files/files.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/createPost.dto";
import { Posts } from "./posts";

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        private fileService: FilesService,
        @Inject(REQUEST)
        private req: Request,
        private userService:UsersService
    ) {}

    async createPost(dto: CreatePostDto, image: any) {
        const userId=this.req.user.id
        const user=await this.userService.getUserById(userId)
        const fileName = await this.fileService.createFile(image);
        const post = await this.postsRepository.create({
            ...dto,
            image: fileName,
        });
        user.addPost(post)
        await user.save()
        return post;
    }
}
