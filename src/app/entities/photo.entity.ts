import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "photos" })
export class Photo {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    postId: number;

    @Column({ type: "text" })
    photoUrl: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: string;
}
