import { InjectDataSource } from "@nestjs/typeorm";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as sharp from "sharp";
import { Photo } from "src/app/entities/photo.entity";
import { PhotoRepository } from "src/app/repositories/photo.repository";
import { DataSource, Repository } from "typeorm";

export class PhotoTypeorm implements PhotoRepository {
    private readonly repository: Repository<Photo> = this.dataSource.getRepository(Photo);

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async findById(id: number): Promise<Photo> {
        return await this.repository.findOne({ where: { id: id } });
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
        const photo = await this.findById(id);
        await this.repository.delete(photo.id);
    }
}
