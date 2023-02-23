import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FollowPhotoResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    photoUrl: string;
}

export class UsernameReponse {
    @ApiProperty()
    username: string;
}

export class FollowFindResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;

    @ApiProperty({ type: UsernameReponse })
    user: UsernameReponse;

    @ApiProperty({ type: FollowPhotoResponse })
    photo: FollowPhotoResponse;
}

export class PostFindResponse {
    @ApiProperty()
    id: number;

    @ApiProperty({ type: UsernameReponse })
    user: UsernameReponse;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;
}

export class PostResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;
}
