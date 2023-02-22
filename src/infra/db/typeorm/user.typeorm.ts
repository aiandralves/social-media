import { BadRequestException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateFollowerDTO } from "src/app/dtos/create-follower.dto";
import { CreateUserDTO } from "src/app/dtos/create-user.dto";
import { UpdateUserDTO } from "src/app/dtos/update-user.dto";
import { User } from "src/app/entities/user.entity";
import { UserRepository } from "src/app/repositories/user.repository";
import { DataSource, Repository } from "typeorm";

export class UserTypeorm implements UserRepository {
    private readonly repository: Repository<User> = this.dataSource.getRepository(User);

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async findById(id: number): Promise<User> {
        return await this.repository
            .createQueryBuilder("user")
            .select(["user.id", "user.name", "user.email", "user.username"])
            .addSelect(["profile.id", "profile.avatar", "profile.bio", "profile.privacy"])
            .innerJoin("user.profile", "profile")
            .where("user.id = :id", { id })
            .getOne();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ where: { email: email } });
    }

    async create(data: CreateUserDTO): Promise<CreateUserDTO> {
        return await this.repository.save(this.repository.create(data));
    }

    async find(): Promise<User[]> {
        return await this.repository.find();
    }

    async update(id: number, data: UpdateUserDTO): Promise<UpdateUserDTO> {
        const user = await this.findById(id);

        this.repository.merge(user, data);
        return await this.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.repository.delete(user.id);
    }

    async createFollowers(id: number, data: CreateFollowerDTO): Promise<User> {
        const user = await this.repository
            .createQueryBuilder("user")
            .where("user.id = :id", { id: id })
            .leftJoinAndSelect("user.follower", "follower")
            .getOne();

        const follower = await this.repository.findOne({ where: { id: data.followerId } });

        if (user.follower.find((follower) => follower.id === data.followerId))
            throw new BadRequestException("Esse usuário já é um seguidor");

        if (user.id === data.followerId) throw new BadRequestException("Não é permitido seguir você mesmo");

        user.follower = user.follower || [];
        user.follower.push(follower);

        return await this.repository.save(user);
    }

    async findFollowers(id: number): Promise<User[]> {
        return await this.repository
            .createQueryBuilder("user")
            .select(["user.id", "user.name", "user.username"])
            .addSelect(["follower.id", "follower.name"])
            .leftJoin("user.follower", "follower")
            .where("user.id = :id", { id: id })
            .getMany();
    }
}
