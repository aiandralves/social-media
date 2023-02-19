import { Module } from "@nestjs/common";
import { OrmConfigModule } from "./config/db/orm.config.module";
import { UserModule } from "./infra/modules/user.module";

@Module({
    imports: [OrmConfigModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
