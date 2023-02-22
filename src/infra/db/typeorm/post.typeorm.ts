import { InjectDataSource } from "@nestjs/typeorm";
import { CreatePostDTO } from "src/app/dtos/create-post.dto";
import { FindPostDTO } from "src/app/dtos/find-post.dto";
import { UpdatePostDTO } from "src/app/dtos/update-post.dto";
import { Post } from "src/app/entities/post.entity";
import { PostRepository } from "src/app/repositories/post.repository";
import { DataSource, Repository } from "typeorm";

export class PostTypeorm implements PostRepository {
    private readonly repository: Repository<Post> = this.dataSource.getRepository(Post);

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async findById(id: number): Promise<Post> {
        return await this.repository.findOne({ where: { id: id } });
    }

    async create(userId: number, data: CreatePostDTO): Promise<CreatePostDTO> {
        return await this.repository.save(this.repository.create({ userId, ...data }));
    }

    async find(options?: FindPostDTO): Promise<Post[]> {
        const post = this.repository
            .createQueryBuilder("post")
            .addSelect(["user.username"])
            .addSelect(["photo.id", "photo.photoUrl"])
            .leftJoin("post.user", "user")
            .leftJoin("post.photo", "photo");

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
