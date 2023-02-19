import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import { USER, UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER)
        private userRepository: UserRepository,
    ) {}

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new Error("Usuário não encontrado!");

        return user;
    }

    async create(data: UserDTO): Promise<UserDTO> {
        const email = await this.userRepository.findByEmail(data.email);

        if (email) throw new Error("E-mail informado já existe!");

        return await this.userRepository.create(data);
    }

    async find(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
