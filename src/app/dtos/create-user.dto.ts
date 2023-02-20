import { IsEmail, IsNotEmpty } from "class-validator";

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
}
