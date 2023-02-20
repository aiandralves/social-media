import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Posts1676915839776 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
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
                    },
                    {
                        name: "description",
                        type: "text",
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
                        default: "now()",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "posts",
            new TableForeignKey({
                name: "fk_user_posts",
                columnNames: ["userId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("posts", "fk_user_posts");
        await queryRunner.dropTable("posts");
    }
}
