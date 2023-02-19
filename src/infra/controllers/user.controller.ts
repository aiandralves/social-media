import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { UserDTO } from "src/app/dtos/user.dto";
import { UserService } from "src/app/services/user.service";

@Controller("api/v1/users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: UserDTO) {
        return this.userService.create(body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get(":id")
    async getUser(@Param("id") id: number) {
        return await this.userService.getUser(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Get()
    async find() {
        return await this.userService.find();
    }
}
