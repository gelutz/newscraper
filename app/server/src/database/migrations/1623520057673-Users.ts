import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1623520057673 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        generationStrategy: "increment",
                        isGenerated: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
            })
        );

        /** TODO: REMOVE IN PRODUCTION */
        queryRunner.query(
            "INSERT INTO users (nome, email) values ('Hidden pygmy', 'maybe.manus@gmail.com', 'admin')"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("news");
    }
}
