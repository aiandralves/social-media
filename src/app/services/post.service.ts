import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { FindPostDTO } from "../dtos/find-post.dto";
import { UpdatePostDTO } from "../dtos/update-post.dto";
import { Post } from "../entities/post.entity";
import { POST, PostRepository } from "../repositories/post.repository";

@Injectable()
export class PostService {
    constructor(
        @Inject(POST)
        private readonly postRepository: PostRepository,
    ) {}

    async getPost(id: number): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if (!post) throw new NotFoundException("Postagem não encontrada!");

        return post;
    }

    async create(userId: number, data: CreatePostDTO): Promise<CreatePostDTO> {
        return await this.postRepository.create(userId, data);
    }

    async find(options?: FindPostDTO): Promise<Post[]> {
        return await this.postRepository.find({ userId: options.userId });
    }

    async update(id: number, data: UpdatePostDTO): Promise<UpdatePostDTO> {
        const post = await this.postRepository.findById(id);

        if (!post) throw new NotFoundException("Postagem não encontrada!");

        post.description = data.description;

        return await this.postRepository.update(id, post);
    }

    async delete(id: number): Promise<void> {
        const post = await this.postRepository.findById(id);

        if (!post) throw new NotFoundException("Postagem não encontrada!");

        await this.postRepository.delete(post.id);
    }
}
