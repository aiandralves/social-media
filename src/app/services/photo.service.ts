import { Inject, Injectable } from "@nestjs/common";
import { Photo } from "../entities/photo.entity";
import { PHOTO, PhotoRepository } from "../repositories/photo.repository";

@Injectable()
export class PhotoService {
    constructor(
        @Inject(PHOTO)
        private readonly photoRepository: PhotoRepository,
    ) {}

    async getPhoto(id: number): Promise<Photo> {
        return await this.photoRepository.findById(id);
    }

    async create(postId: number, files: Express.Multer.File[]): Promise<Photo[]> {
        return await this.photoRepository.create(postId, files);
    }

    async find(id: number): Promise<Photo[]> {
        return await this.photoRepository.find(id);
    }

    async delete(id: number): Promise<void> {
        await this.photoRepository.delete(id);
    }
}
