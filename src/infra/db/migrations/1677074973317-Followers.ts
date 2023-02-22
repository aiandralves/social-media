import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Followers1677074973317 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "followers",
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
                        name: "followerId",
                        type: "int",
                        length: "11",
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
            "followers",
            new TableForeignKey({
                name: "fk_followers_userId",
                columnNames: ["userId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            }),
        );

        await queryRunner.createForeignKey(
            "followers",
            new TableForeignKey({
                name: "fk_followers_followerId",
                columnNames: ["followerId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("followers", "fk_followers_userId");
        await queryRunner.dropForeignKey("followers", "fk_followers_followerId");
        await queryRunner.dropTable("followers");
    }
}
