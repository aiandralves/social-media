import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDTO {
    @IsNotEmpty({ message: "Preencha a descrição da postagem" })
    @ApiProperty({ description: "Descrição da nova postagem" })
    description: string;
}
