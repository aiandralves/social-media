import { UpdateUserDTO } from "src/app/dtos/update-user.dto";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { User } from "../entities/user.entity";

export const USER = "USER";

export interface UserRepository {
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(data: CreateUserDTO): Promise<CreateUserDTO>;
    find(): Promise<User[]>;
    update(id: number, data: UpdateUserDTO): Promise<UpdateUserDTO>;
    delete(id: number): Promise<void>;
}
