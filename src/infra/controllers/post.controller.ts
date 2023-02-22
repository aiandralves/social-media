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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger/dist/decorators";
import { FindPostDTO } from "src/app/dtos/find-post.dto";
import { UpdatePostDTO } from "src/app/dtos/update-post.dto";
import { PhotoService } from "src/app/services/photo.service";
import { PostService } from "src/app/services/post.service";
import { BadRequestResponse, NotFoundResponse } from "../swaggers/error.swagger";
import { PhotoResponse } from "../swaggers/photo.swager";
import { PostFindResponse, PostResponse } from "../swaggers/post.swagger";

@Controller("api/v1/posts")
@ApiTags("posts")
export class PostController {
    constructor(private readonly postService: PostService, private readonly photoService: PhotoService) {}

    @Get()
    @ApiOperation({ summary: "Listar todas as postagens" })
    @ApiResponse({ type: PostFindResponse, isArray: true, status: 200, description: "Listagem de todos as postagens" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 400, description: "O ID da postagem só é permitido números" })
    async find(@Query() query: FindPostDTO) {
        return await this.postService.find(query).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id")
    @ApiOperation({ summary: "Retornar uma postagem" })
    @ApiResponse({ type: PostResponse, isArray: true, status: 200, description: "Postagem retornada com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Postagem não encontrado" })
    async getPost(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.getPost(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    @ApiOperation({ summary: "Atualizar uma postagem" })
    @ApiResponse({ type: PostResponse, isArray: true, status: 200, description: "Postagem atualizada com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Postagem não encontrado" })
    async update(@Param("id", new ParseIntPipe()) id: number, @Body() body: UpdatePostDTO) {
        return await this.postService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Deletar uma postagem" })
    @ApiResponse({ status: 204, description: "Postagem deletada com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Postagem não encontrado" })
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id/photos")
    @ApiOperation({ summary: "Listar todas as fotos da postagem" })
    @ApiResponse({
        type: PhotoResponse,
        isArray: true,
        status: 200,
        description: "Listagem de todas as fotos da postagem",
    })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Postagem não encontrado" })
    async findPhotos(@Param("id", new ParseIntPipe()) id: number) {
        return await this.photoService.find(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post(":id/photos")
    @ApiOperation({ summary: "Fazer upload de fotos da postagem" })
    @UseInterceptors(FilesInterceptor("files", 6, { limits: { fileSize: 5000000 } }))
    @ApiResponse({
        type: PhotoResponse,
        isArray: true,
        status: 201,
        description: "O upload da foto foi realizado com sucesso",
    })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Postagem não encontrado" })
    async createPhotos(@Param("id", new ParseIntPipe()) id: number, @UploadedFiles() files: Express.Multer.File[]) {
        return await this.photoService.create(id, files).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
