import {
    CannotConnectAlreadyConnectedError,
    CannotExecuteNotConnectedError,
    Connection,
    createConnection,
} from "typeorm";

import { config, testConfig } from "./ormconfig";
// import News from "../models/News";

let connection: Connection;

export async function connect(): Promise<Connection> {
    if (connection) {
        throw new CannotConnectAlreadyConnectedError("default");
    }

    try {
        const c = process.env.NODE_ENV === "test" ? testConfig : config;
        connection = await createConnection(c);
    } catch (e) {
        console.error(e.stack);
    }

    return connection;
}

export async function disconnect(): Promise<void> {
    if (!connection) {
        throw new CannotExecuteNotConnectedError("default");
    }

    await connection.close();
}

export { connection };
// export async function getNewsRepository() {}
