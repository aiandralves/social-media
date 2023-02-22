import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProfileResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    bio: string;

    @ApiProperty()
    privacy: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;
}

export class PostDescResponse {
    @ApiProperty()
    description: string;
}

export class UserResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;

    @ApiProperty({ type: ProfileResponse })
    profile: ProfileResponse;
}
