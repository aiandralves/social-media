import { User } from "../entities/user.entity";
import { UserDTO } from "./../dtos/user.dto";

export const USER = "USER";

export interface UserRepository {
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(data: UserDTO): Promise<UserDTO>;
    find(): Promise<User[]>;
}
