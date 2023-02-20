import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Profile1676910803076 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profiles",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        length: "11",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "userId",
                        type: "int",
                        length: "11",
                        isUnique: true,
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "bio",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "privacy",
                        type: "char",
                        length: "1",
                        default: "0",
                        isNullable: true,
                        comment: "public = 0 and private = 1",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "profiles",
            new TableForeignKey({
                name: "fk_user_profiles",
                columnNames: ["userId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("profiles", "fk_user_profiles");
        await queryRunner.dropTable("profiles");
    }
}
