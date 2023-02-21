import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "posts" })
export class Post {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @Column()
    userId: number;

    @Column({ type: "text" })
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: string;
}
