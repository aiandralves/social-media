import { Controller, Delete, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist";
import { PhotoService } from "src/app/services/photo.service";

@Controller("api/v1/photos")
@ApiTags("photos")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Delete(":id")
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.photoService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
