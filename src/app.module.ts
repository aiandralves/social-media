import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./config/db/data-source";
import { UserModule } from "./infra/modules/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
