import { IsNumber } from "class-validator";

export class CreateFollowerDTO {
    @IsNumber()
    followerId: number;
}
