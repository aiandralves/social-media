import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { ArrayNotEmpty, IsNumber, IsOptional } from "class-validator";

export class FindPostDTO {
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "ID do usuário para realizar o filtro de postagens", maxLength: 11 })
    userId?: number;

    @IsOptional()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @ApiPropertyOptional({ description: "ID's do usuário para listar postagens", maxLength: 11 })
    userIds?: Array<number>;
}
