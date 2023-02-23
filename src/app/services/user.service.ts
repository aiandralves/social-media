import { NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { CreateFollowerDTO } from "../dtos/create-follower.dto";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { POST, PostRepository } from "../repositories/post.repository";
import { USER, UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER)
        private userRepository: UserRepository,
        @Inject(POST)
        private postRepository: PostRepository,
    ) {}

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundException("Usuário não encontrado!");

        return user;
    }

    async create(data: CreateUserDTO): Promise<CreateUserDTO> {
        const email = await this.userRepository.findByEmail(data.email);

        if (email) throw new Error("E-mail informado já existe!");

        return await this.userRepository.create(data);
    }

    async find(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: number, data: UpdateUserDTO): Promise<UpdateUserDTO> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundException("Usuário não encontrado!");

        user.name = data.name;
        user.username = data.username;

        return await this.userRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundException("Usuário não encontrado!");

        await this.userRepository.delete(user.id);
    }

    async createFollowers(id: number, data: CreateFollowerDTO): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundException("Usuário não encontrado!");

        return await this.userRepository.createFollowers(user.id, data);
    }

    async findFollowers(id: number): Promise<User[]> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new NotFoundException("Usuário não encontrado!");

        return await this.userRepository.findFollowers(user.id);
    }

    async findFollows(followerId: number): Promise<User[]> {
        return await this.userRepository.findFollows(followerId);
    }

    async findFollowsPosts(followerId: number): Promise<Post[]> {
        const follows = await this.findFollows(followerId);
        const followerIds = follows.map(({ id }) => id);
        return await this.postRepository.find({ userIds: followerIds });
    }
}
