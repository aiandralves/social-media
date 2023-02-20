import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Put, Query } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { UpdatePostDTO } from "src/app/dtos/update-post.dto";
import { PostService } from "src/app/services/post.service";
import { FindPostDTO } from "./../../app/dtos/find-post.dto";

@Controller("api/v1/posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get(":id")
    async getPost(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.getPost(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get()
    async find(@Query() query: FindPostDTO) {
        return await this.postService.find(query).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    async update(@Param("id", new ParseIntPipe()) id: number, @Body() body: UpdatePostDTO) {
        return await this.postService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
