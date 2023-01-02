import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { Req, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/rolesAuth.decorator";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
    constructor(private postService: PostsService) {}
    @Roles("user")
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor("image"))
    @Post()
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.createPost(dto, image);
    }
}
