import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OrmConfigModule } from "./config/db/orm.config.module";

@Module({
    imports: [ConfigModule.forRoot(), OrmConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
