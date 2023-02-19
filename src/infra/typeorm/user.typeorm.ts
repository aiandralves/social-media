import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/app/dtos/user.dto";
import { User } from "src/app/entities/user.entity";
import { UserRepository } from "src/app/repositories/user.repository";
import { Repository } from "typeorm";

export class UserTypeorm implements UserRepository {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

    async findById(id: number): Promise<User> {
        return await this.repository.createQueryBuilder("user").where("user.id = :id", { id: id }).getOne();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.createQueryBuilder("user").where("user.email = :email", { email: email }).getOne();
    }

    async create(data: UserDTO): Promise<UserDTO> {
        return await this.repository.save(this.repository.create(data));
    }

    async find(): Promise<User[]> {
        return await this.repository.createQueryBuilder().getMany();
    }
}
