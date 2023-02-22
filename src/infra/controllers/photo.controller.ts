import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { PhotoService } from "src/app/services/photo.service";

@Controller("api/v1/photos")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Delete(":id")
    async delete(@Param("id", new ParseIntPipe()) id: number) {
        return await this.photoService.delete(id);
    }
}
