import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateProfileDTO } from "./create-profile.dto";

export class CreateUserDTO {
    @IsNotEmpty({ message: "Preencha seu nome" })
    name: string;

    @IsNotEmpty({ message: "Preencha seu e-mail" })
    @IsEmail({}, { message: "Informe um e-mail válido" })
    email: string;

    @IsNotEmpty({ message: "Preencha seu usuário" })
    username: string;

    @IsNotEmpty({ message: "Preencha sua senha" })
    password: string;

    @IsOptional()
    @Type(() => CreateProfileDTO)
    @ValidateNested()
    profile: CreateProfileDTO;
}
