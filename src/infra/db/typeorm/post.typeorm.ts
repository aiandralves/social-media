import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDTO } from "src/app/dtos/create-post.dto";
import { FindPostDTO } from "src/app/dtos/find-post.dto";
import { UpdatePostDTO } from "src/app/dtos/update-post.dto";
import { Post } from "src/app/entities/post.entity";
import { PostRepository } from "src/app/repositories/post.repository";
import { Repository } from "typeorm";

export class PostTypeorm implements PostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly repository: Repository<Post>,
    ) {}

    async findById(id: number): Promise<Post> {
        return await this.repository.createQueryBuilder("post").where("post.id = :id", { id: id }).getOne();
    }

    async create(userId: number, data: CreatePostDTO): Promise<CreatePostDTO> {
        return await this.repository.save(this.repository.create({ userId, ...data }));
    }

    async find(options?: FindPostDTO): Promise<Post[]> {
        const post = this.repository
            .createQueryBuilder("post")
            .select(["post.id", "post.userId", "post.description"])
            .addSelect(["user.username"])
            .leftJoin("post.user", "user");

        if (options?.userId) post.andWhere("post.userId = :userId", { userId: options.userId });

        return await post.getMany();
    }

    async update(id: number, data: UpdatePostDTO): Promise<UpdatePostDTO> {
        const post = await this.findById(id);

        this.repository.merge(post, data);
        return await this.repository.save(post);
    }

    async delete(id: number): Promise<void> {
        const post = await this.findById(id);
        await this.repository.delete(post.id);
    }
}
