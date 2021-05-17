import dotenv from "dotenv";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.TEST_DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: ["src/models/*.{js,ts}"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

const testConfig: SqliteConnectionOptions = {
    type: "sqlite",
    logging: ["error"],
    database: "src/_tests/safedb.sqlite",
    entities: ["src/models/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

export { config, testConfig };
