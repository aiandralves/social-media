import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: "photos" })
export class Photo {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToMany(() => Post, (post) => post.photo)
    @JoinColumn({ name: "postId", referencedColumnName: "id" })
    post: Post;

    @Column()
    postId: number;

    @Column({ type: "text" })
    photoUrl: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: string;
}
