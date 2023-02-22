import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { UpdateProfileDTO } from "./update-profile.dto";

export class UpdateUserDTO {
    @IsNotEmpty({ message: "Preencha o nome do usuário" })
    @ApiProperty({ description: "Nome do usuário", maxLength: 255 })
    name: string;

    @IsNotEmpty({ message: "Preencha o nome de usuário" })
    @ApiProperty({ description: "Nome de usuário", maxLength: 255 })
    username: string;

    @IsOptional()
    @Type(() => UpdateProfileDTO)
    @ValidateNested()
    @ApiPropertyOptional({ type: UpdateProfileDTO })
    profile: UpdateProfileDTO;
}
