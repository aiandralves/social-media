import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNumber, IsOptional, IsUrl } from "class-validator";

export class UpdateProfileDTO {
    @IsNumber()
    @ApiProperty({ description: "ID do usuário" })
    id: number;

    @IsOptional()
    @IsUrl({}, { message: "Informe uma url válida de foto" })
    @ApiPropertyOptional({ description: "URL da foto do perfil do usuário", maxLength: 255 })
    avatar?: string;

    @IsOptional()
    @ApiPropertyOptional({ description: "Uma breve descrição do usuário" })
    bio?: string;

    @IsOptional()
    @IsIn(["0", "1"], { message: "Só é permitido 0 ou 1" })
    @ApiPropertyOptional({ description: "Privacidade do perefil do usuário, se for 0 é público e se for 1 é privado" })
    privacy?: string;
}
