import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "src/app/entities/photo.entity";
import { PHOTO } from "src/app/repositories/photo.repository";
import { PhotoService } from "src/app/services/photo.service";
import { PhotoController } from "../controllers/photo.controller";
import { PhotoTypeorm } from "../db/typeorm/photo.typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Photo])],
    controllers: [PhotoController],
    providers: [
        PhotoService,
        {
            useClass: PhotoTypeorm,
            provide: PHOTO,
        },
    ],
    exports: [PhotoService],
})
export class PhotoModule {}
