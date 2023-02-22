import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as sharp from "sharp";
import { Photo } from "src/app/entities/photo.entity";
import { PhotoRepository } from "src/app/repositories/photo.repository";
import { Repository } from "typeorm";

export class PhotoTypeorm implements PhotoRepository {
    constructor(
        @InjectRepository(Photo)
        private readonly repository: Repository<Photo>,
    ) {}

    async findById(id: number): Promise<Photo> {
        let photo: Photo;
        try {
            photo = await this.repository.findOneOrFail({ where: { id: id } });
        } catch (e) {
            throw new NotFoundException(e.message);
        }
        return photo;
    }

    async create(postId: number, files: Express.Multer.File[]): Promise<Photo[]> {
        const uploadDir = join(__dirname, "..", "..", "..", "..", "client", "posts", String(postId));

        if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

        const photos = await Promise.all(
            files.map(async (file) => {
                const fileName = `${Date.now()}-${file.originalname}`;
                const fileDir = `${uploadDir}/${fileName}`;
                const fileBuffer = await sharp(file.buffer).resize(400, 400, { fit: "contain" }).toBuffer();
                writeFileSync(fileDir, fileBuffer);
                return this.repository.create({ postId, photoUrl: `/posts/${postId}/${fileName}` });
            }),
        );

        return await this.repository.save(photos);
    }

    async find(postId: number): Promise<Photo[]> {
        return await this.repository.find({ where: { postId: postId } });
    }

    async delete(id: number): Promise<void> {
        try {
            await this.repository.findOneOrFail({ where: { id: id } });
        } catch (e) {
            throw new NotFoundException(e.message);
        }

        await this.repository.delete({ id });
    }
}
