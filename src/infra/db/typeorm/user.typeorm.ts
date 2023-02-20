import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/app/dtos/create-user.dto";
import { UpdateUserDTO } from "src/app/dtos/update-user.dto";
import { User } from "src/app/entities/user.entity";
import { UserRepository } from "src/app/repositories/user.repository";
import { Repository } from "typeorm";

export class UserTypeorm implements UserRepository {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

    async findById(id: number): Promise<User> {
        return await this.repository
            .createQueryBuilder("user")
            .select(["user.id", "user.name", "user.email", "user.username"])
            .addSelect(["profile.id", "profile.avatar", "profile.bio", "profile.privacy"])
            .innerJoin("user.profile", "profile")
            .where("user.id = :id", { id })
            .getOneOrFail();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.createQueryBuilder("user").where("user.email = :email", { email: email }).getOne();
    }

    async create(data: CreateUserDTO): Promise<CreateUserDTO> {
        return await this.repository.save(this.repository.create(data));
    }

    async find(): Promise<User[]> {
        return await this.repository.createQueryBuilder().getMany();
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
}
