import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/app/entities/profile.entity";
import { User } from "src/app/entities/user.entity";
import { POST } from "src/app/repositories/post.repository";
import { USER } from "src/app/repositories/user.repository";
import { UserService } from "src/app/services/user.service";
import { UserController } from "../controllers/user.controller";
import { PostTypeorm } from "../db/typeorm/post.typeorm";
import { UserTypeorm } from "../db/typeorm/user.typeorm";
import { PostModule } from "./post.module";

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile]), PostModule],
    controllers: [UserController],
    providers: [
        UserService,
        {
            useClass: UserTypeorm,
            provide: USER,
        },
        {
            useClass: PostTypeorm,
            provide: POST,
        },
    ],
    exports: [UserService],
})
export class UserModule {}
