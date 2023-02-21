import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Photos1677019758604 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "photos",
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
                        name: "postId",
                        type: "int",
                        length: "11",
                    },
                    {
                        name: "photoUrl",
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
            "photos",
            new TableForeignKey({
                name: "fk_post_photos",
                columnNames: ["postId"],
                referencedTableName: "posts",
                referencedColumnNames: ["id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("photos", "fk_post_photos");
        await queryRunner.dropTable("photos");
    }
}
