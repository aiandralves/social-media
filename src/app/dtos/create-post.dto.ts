import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {
    @IsNotEmpty({ message: "Preencha a descrição da postagem" })
    description: string;
}
