import {
    CannotConnectAlreadyConnectedError,
    CannotExecuteNotConnectedError,
    Connection,
    createConnection,
} from 'typeorm';

import { prodPostgres, testPostgres } from '../../config/ormconfig';

let connection: Connection;

export async function start(): Promise<Boolean> {
    if (connection) {
        throw new CannotConnectAlreadyConnectedError('default');
    }

    try {
        const c = process.env.NODE_ENV === 'test' ? testPostgres : prodPostgres;
        connection = await createConnection(c);
        connection.runMigrations();

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function connect(): Promise<Connection> {
    if (connection) {
        throw new CannotConnectAlreadyConnectedError('default');
    }

    try {
        const c = process.env.DB_TEST_HOST ? testPostgres : prodPostgres;
        connection = await createConnection(c);
    } catch (e) {
        console.error(e);
    }

    return connection;
}

export async function disconnect(): Promise<void> {
    if (!connection) {
        throw new CannotExecuteNotConnectedError('default');
    }

    await connection.close();
}

export { connection };
