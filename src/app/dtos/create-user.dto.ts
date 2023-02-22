import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, Matches, ValidateNested } from "class-validator";
import { RegExHelper } from "src/helpers/regex.helper";
import { CreateProfileDTO } from "./create-profile.dto";

export class CreateUserDTO {
    @IsNotEmpty({ message: "Preencha seu nome" })
    @ApiProperty({ description: "Nome do usuário", maxLength: 255 })
    name: string;

    @IsNotEmpty({ message: "Preencha seu e-mail" })
    @IsEmail({}, { message: "Informe um e-mail válido" })
    @ApiProperty({ description: "E-mail do usuário", maxLength: 255 })
    email: string;

    @IsNotEmpty({ message: "Preencha seu usuário" })
    @ApiProperty({ description: "Nome de usuário", maxLength: 255 })
    username: string;

    @IsNotEmpty({ message: "Preencha sua senha" })
    @Matches(RegExHelper.password, {
        message: "Preencha uma senha com letras maíusculas, mínusculas, números e caracteres especiais",
    })
    @ApiProperty({ description: "Senha do usuário", maxLength: 255 })
    password: string;

    @IsOptional()
    @Type(() => CreateProfileDTO)
    @ValidateNested()
    @ApiPropertyOptional({ type: CreateProfileDTO })
    profile: CreateProfileDTO;
}
