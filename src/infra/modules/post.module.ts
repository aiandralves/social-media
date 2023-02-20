import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/app/entities/post.entity";
import { POST } from "src/app/repositories/post.repository";
import { PostService } from "src/app/services/post.service";
import { PostController } from "../controllers/post.controller";
import { PostTypeorm } from "../db/typeorm/post.typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [
        PostService,
        {
            useClass: PostTypeorm,
            provide: POST,
        },
    ],
    exports: [PostService],
})
export class PostModule {}
