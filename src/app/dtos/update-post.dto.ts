import { IsNotEmpty } from "class-validator";

export class UpdatePostDTO {
    @IsNotEmpty({ message: "Preencha a descrição da postagem" })
    description: string;
}
