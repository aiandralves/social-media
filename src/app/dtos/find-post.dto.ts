import { IsNumber, IsOptional } from "class-validator";

export class FindPostDTO {
    @IsOptional()
    @IsNumber()
    userId?: number;
}
