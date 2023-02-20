import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    UseInterceptors,
} from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { CreatePostDTO } from "src/app/dtos/create-post.dto";
import { CreateUserDTO } from "src/app/dtos/create-user.dto";
import { UpdateUserDTO } from "src/app/dtos/update-user.dto";
import { PostService } from "src/app/services/post.service";
import { UserService } from "src/app/services/user.service";

@Controller("api/v1/users")
export class UserController {
    constructor(private readonly userService: UserService, private readonly postService: PostService) {}

    @Post()
    async create(@Body() body: CreateUserDTO) {
        return this.userService.create(body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.getUser(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async find() {
        return await this.userService.find();
    }

    @Put(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param("id", new ParseIntPipe()) id: number, @Body() body: UpdateUserDTO) {
        return await this.userService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post(":id/posts")
    async createPost(@Param("id", new ParseIntPipe()) id: number, @Body() body: CreatePostDTO) {
        return await this.postService.create(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id/posts")
    async findPosts(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.find({ userId: id }).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
