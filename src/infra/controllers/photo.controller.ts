import { Controller } from "@nestjs/common";
import { PhotoService } from "src/app/services/photo.service";

@Controller("api/v1/photos")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}
}
