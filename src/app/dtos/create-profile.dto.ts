import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { IsIn, IsOptional, IsUrl } from "class-validator";

export class CreateProfileDTO {
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
