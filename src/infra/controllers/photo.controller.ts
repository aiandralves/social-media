import { Controller, Delete, HttpCode, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger/dist";
import { PhotoService } from "src/app/services/photo.service";
import { BadRequestResponse, NotFoundResponse } from "../swaggers/error.swagger";

@Controller("api/v1/photos")
@ApiTags("photos")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({ summary: "Deletar uma foto" })
    @ApiResponse({ status: 204, description: "Foto deletada com sucesso" })
    @ApiResponse({ type: BadRequestResponse, status: 400, description: "Informe os parâmetros válidos" })
    @ApiResponse({ type: NotFoundResponse, status: 404, description: "Foto não encontrado" })
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.photoService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
