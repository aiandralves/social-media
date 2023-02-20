import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/app/entities/profile.entity";
import { User } from "src/app/entities/user.entity";
import { USER } from "src/app/repositories/user.repository";
import { UserService } from "src/app/services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserTypeorm } from "../db/typeorm/user.typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            useClass: UserTypeorm,
            provide: USER,
        },
    ],
    exports: [],
})
export class UserModule {}
