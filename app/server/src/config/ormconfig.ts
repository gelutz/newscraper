import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from "./environment";
const prodPostgres: PostgresConnectionOptions = {
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    logging: ["error"],
    entities: ["src/models/*.{js,ts}"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

const testPostgres: PostgresConnectionOptions = {
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    logging: "all",
    entities: ["src/models/*.{js,ts}"],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: "src/models/",
        migrationsDir: "src/database/migrations/",
    },
};

export { prodPostgres, testPostgres };
