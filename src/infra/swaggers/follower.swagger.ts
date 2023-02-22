import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FollowerUserResponse {
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
}

export class FollowerResponse {
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

    @ApiProperty({ type: FollowerUserResponse, isArray: true })
    follower: FollowerUserResponse;
}

export class FollowerUserFindResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}

export class FollowerFindResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty({ type: FollowerUserFindResponse, isArray: true })
    follower: FollowerUserFindResponse;
}
