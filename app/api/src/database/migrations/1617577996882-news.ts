import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class news1617577996882 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "news",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isUnique: false,
                    },
                    {
                        name: "link",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "from",
                        type: "varchar",
                    },
                    {
                        name: "date",
                        type: "date",
                        default: "current_date",
                    },
                ],
            })
        );

        queryRunner.query(
            "INSERT INTO news (title, date, \"from\", link) values ('Teste #1', current_date, 'First migration', 'http://localhost:3333')"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("news");
    }
}
