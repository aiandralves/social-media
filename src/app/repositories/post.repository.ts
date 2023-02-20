import { CreatePostDTO } from "../dtos/create-post.dto";
import { FindPostDTO } from "../dtos/find-post.dto";
import { UpdatePostDTO } from "../dtos/update-post.dto";
import { Post } from "../entities/post.entity";

export const POST = "POST";

export interface PostRepository {
    findById(id: number): Promise<Post>;
    create(userId: number, data: CreatePostDTO): Promise<CreatePostDTO>;
    find(options?: FindPostDTO): Promise<Post[]>;
    update(id: number, data: UpdatePostDTO): Promise<UpdatePostDTO>;
    delete(id: number): Promise<void>;
}
