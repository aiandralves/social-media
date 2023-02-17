import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.TYPEORM_TYPE as any,
            host: process.env.TYPEORM_HOST,
            port: Number(process.env.TYPEORM_PORT),
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [__dirname + "/**/**.entity.${.js, .ts}"],
            synchronize: false,
        }),
    ],
    exports: [TypeOrmModule],
})
export class OrmConfigModule {}