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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger/dist/decorators";
import { CreateFollowerDTO } from "src/app/dtos/create-follower.dto";
import { CreatePostDTO } from "src/app/dtos/create-post.dto";
import { CreateUserDTO } from "src/app/dtos/create-user.dto";
import { UpdateUserDTO } from "src/app/dtos/update-user.dto";
import { PostService } from "src/app/services/post.service";
import { UserService } from "src/app/services/user.service";
import { BadRequestResponse, NotFoundResponse } from "../swaggers/error.swagger";
import { FollowerFindResponse, FollowerResponse } from "../swaggers/follower.swagger";
import { FollowFindResponse, PostFindResponse, PostResponse } from "../swaggers/post.swagger";
import { UserResponse } from "../swaggers/user.swagger";

@Controller("api/v1/users")
@ApiTags("users")
export class UserController {
    constructor(private readonly userService: UserService, private readonly postService: PostService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Listar todos os usuários" })
    @ApiResponse({ type: UserResponse, isArray: true, status: 200, description: "Listagem de todos os usuários" })
    async find() {
        return await this.userService.find();
    }

    @Post()
    @ApiOperation({ summary: "Cadastrar um usuário" })
    @ApiResponse({ type: UserResponse, status: 201, description: "Usuário cadastrado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    async create(@Body() body: CreateUserDTO) {
        return this.userService.create(body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Retornar um usuário" })
    @ApiResponse({ type: UserResponse, status: 201, description: "Usuário retornado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async getUser(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.getUser(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Atualizar um usuário" })
    @ApiResponse({ type: UserResponse, status: 200, description: "Usuário atualizado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async update(@Param("id", new ParseIntPipe()) id: number, @Body() body: UpdateUserDTO) {
        return await this.userService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Deletar um usuário" })
    @ApiResponse({ status: 204, description: "Usuário deletado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id/posts")
    @ApiOperation({ summary: "Listar todas as postagens de um usuário" })
    @ApiResponse({
        type: PostFindResponse,
        isArray: true,
        status: 200,
        description: "Lista de todos as postagens do usuário",
    })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async findPosts(@Param("id", new ParseIntPipe()) id: number) {
        return await this.postService.find({ userId: id }).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post(":id/posts")
    @ApiOperation({ summary: "Cadastrar uma postagem de um usuário" })
    @ApiResponse({ type: PostResponse, status: 201, description: "Postagem do usuário cadastrado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async createPost(@Param("id", new ParseIntPipe()) id: number, @Body() body: CreatePostDTO) {
        return await this.postService.create(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id/followers")
    @ApiOperation({ summary: "Listar seguidores de um usuário" })
    @ApiResponse({ type: FollowerFindResponse, status: 200, description: "Lista de seguidores do usuário" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Usuário não encontrado" })
    async findFollowers(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.findFollowers(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post(":id/followers")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: "Cadastrar seguidor do usuário" })
    @ApiResponse({ type: FollowerResponse, status: 201, description: "Seguidor do usuário cadastrado com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    async createFollowers(@Param("id", new ParseIntPipe()) id: number, @Body() body: CreateFollowerDTO) {
        return await this.userService.createFollowers(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id/follows")
    @ApiOperation({ summary: "Listar todos os usuários que o usuário selecionado segue" })
    @ApiResponse({ type: FollowerFindResponse, status: 200, description: "Retornar uma lista de usuários" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    async findFollows(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.findFollows(id);
    }

    @Get(":id/follows/posts")
    @ApiOperation({ summary: "Listar todas as postagens dos seguidores dos usuarios" })
    @ApiResponse({ type: FollowFindResponse, status: 200, description: "Retornar uma lista de postagens" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    async findFollowsPosts(@Param("id", new ParseIntPipe()) id: number) {
        return await this.userService.findFollowsPosts(id);
    }
}
