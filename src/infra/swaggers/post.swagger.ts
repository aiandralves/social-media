import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UsernameReponse {
    @ApiProperty()
    username: string;
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
