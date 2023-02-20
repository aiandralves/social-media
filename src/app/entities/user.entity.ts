import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { Profile } from "./profile.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updatedAt: string;

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    post: Array<Post>;

    @BeforeInsert()
    passwdHash() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
