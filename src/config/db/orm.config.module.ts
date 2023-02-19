import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.TYPEORM_CONNECTION,
            host: process.env.TYPEORM_HOST,
            port: process.env.TYPEORM_PORT,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [process.env.TYPEORM_ENTITIES],
            synchronize: false,
            autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions),
    ],
    exports: [TypeOrmModule],
})
export class OrmConfigModule {}
