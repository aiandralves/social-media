import { ConfigModule } from "@nestjs/config";
import { Profile } from "src/app/entities/profile.entity";
import { User } from "src/app/entities/user.entity";
import { Users1676908790120 } from "src/infra/db/migrations/1676908790120-Users";
import { Profile1676910803076 } from "src/infra/db/migrations/1676910803076-Profile";
import { DataSource, DataSourceOptions } from "typeorm";

ConfigModule.forRoot();
export const dataSourceOptions: DataSourceOptions = {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User, Profile],
    migrations: [Users1676908790120, Profile1676910803076],
    synchronize: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);