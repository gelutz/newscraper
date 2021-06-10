import dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

const prodPostgres: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: "all",
    entities: ["src/models/*.{js,ts}"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

const testPostgres: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_TEST_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: "all",
    entities: ["src/models/*.{js,ts}"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

export { prodPostgres, testPostgres };
