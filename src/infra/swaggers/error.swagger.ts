import { ApiProperty } from "@nestjs/swagger";

export class BadRequestResponse {
    @ApiProperty()
    statusCode: number;

    @ApiProperty({ isArray: true })
    message: Array<string>;

    @ApiProperty()
    error: string;
}

export class NotFoundResponse {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}
