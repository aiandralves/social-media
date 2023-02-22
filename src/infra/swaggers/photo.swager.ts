import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PhotoResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    postId: number;

    @ApiProperty()
    photoUrl: string;

    @ApiProperty()
    createdAt: string;

    @ApiPropertyOptional()
    updatedAt: string;
}
