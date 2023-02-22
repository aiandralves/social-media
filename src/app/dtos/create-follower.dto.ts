import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateFollowerDTO {
    @IsNumber()
    @ApiProperty({ description: "ID do seguidor do usuário", maxLength: 11 })
    followerId: number;
}
