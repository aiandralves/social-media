import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "src/app/entities/photo.entity";
import { PhotoService } from "src/app/services/photo.service";
import { PhotoController } from "../controllers/photo.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Photo])],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [PhotoService],
})
export class PhotoModule {}
