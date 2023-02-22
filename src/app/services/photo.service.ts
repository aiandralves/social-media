import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Photo } from "../entities/photo.entity";
import { PHOTO, PhotoRepository } from "../repositories/photo.repository";

@Injectable()
export class PhotoService {
    constructor(
        @Inject(PHOTO)
        private readonly photoRepository: PhotoRepository,
    ) {}

    async getPhoto(id: number): Promise<Photo> {
        const photo = await this.photoRepository.findById(id);

        if (!photo) throw new NotFoundException("Foto não encontrada!");

        return photo;
    }

    async create(postId: number, files: Express.Multer.File[]): Promise<Photo[]> {
        return await this.photoRepository.create(postId, files);
    }

    async find(id: number): Promise<Photo[]> {
        const photo = await this.photoRepository.find(id);

        if (!photo) throw new NotFoundException("Foto não encontrada!");

        return photo;
    }

    async delete(id: number): Promise<void> {
        const photo = await this.photoRepository.findById(id);

        if (!photo) throw new NotFoundException("Foto não encontrada!");

        await this.photoRepository.delete(photo.id);
    }
}
