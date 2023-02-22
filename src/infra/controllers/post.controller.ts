import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { UpdatePostDTO } from "src/app/dtos/update-post.dto";
import { PhotoService } from "src/app/services/photo.service";
import { PostService } from "src/app/services/post.service";
import { FindPostDTO } from "./../../app/dtos/find-post.dto";

@Controller("api/v1/posts")
@ApiTags("posts")
export class PostController {
    constructor(private readonly postService: PostService, private readonly photoService: PhotoService) {}

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

    @Get(":id/photos")
    async findPhotos(@Param("id", new ParseIntPipe()) id: number) {
        return await this.photoService.find(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post(":id/photos")
    @UseInterceptors(FilesInterceptor("files", 6, { limits: { fileSize: 5000000 } }))
    async createPhotos(@Param("id", new ParseIntPipe()) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return await this.photoService.create(id, files).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
