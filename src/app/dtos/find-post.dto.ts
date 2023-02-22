import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { IsNumber, IsOptional } from "class-validator";

export class FindPostDTO {
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "ID do usuário para realizar o filtro de postagens", maxLength: 11 })
    userId?: number;
}
