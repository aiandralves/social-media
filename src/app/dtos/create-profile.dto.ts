import { IsIn, IsOptional, IsUrl } from "class-validator";

export class CreateProfileDTO {
    @IsOptional()
    @IsUrl({}, { message: "Informe uma url válida de foto" })
    avatar?: string;

    @IsOptional()
    bio?: string;

    @IsOptional()
    @IsIn(["0", "1"], { message: "Só é permitido 0 ou 1" })
    privacy?: string;
}
