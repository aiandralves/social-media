import { Photo } from "../entities/photo.entity";

export const PHOTO = "PHOTO";

export interface PhotoRepository {
    findById(id: number): Promise<Photo>;
    create(postId: number, files: Express.Multer.File[]): Promise<Photo[]>;
    find(postId: number): Promise<Photo[]>;
    delete(id: number): Promise<void>;
}
