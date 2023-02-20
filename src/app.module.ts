import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./config/db/data-source";
import { PostModule } from "./infra/modules/post.module";
import { UserModule } from "./infra/modules/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, PostModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
