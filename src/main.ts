import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useStaticAssets(join(__dirname, "..", "client"), { prefix: "/public" });

    const config = new DocumentBuilder()
        .setTitle("Social Media API")
        .setDescription("Desenvolvimento de uma API para social media")
        .setVersion("0.0.1")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);

    await app.listen(3333);
}
bootstrap();
