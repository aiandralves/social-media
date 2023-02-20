import { User } from "src/app/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @Column()
    userId: number;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    privacy: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: string;
}
