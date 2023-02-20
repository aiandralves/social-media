import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { UpdateProfileDTO } from "./update-profile.dto";

export class UpdateUserDTO {
    @IsOptional()
    name: string;

    @IsOptional()
    username: string;

    @IsOptional()
    @Type(() => UpdateProfileDTO)
    @ValidateNested()
    profile: UpdateProfileDTO;
}
