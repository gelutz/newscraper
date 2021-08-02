import redis from "redis";
import { promisify } from "util";

type CustomRedisClient = {
    get(key: string): Promise<boolean>;
    set(key: string, value: string): Promise<boolean>;
    // exists: Promise<boolean>;
};

let client: CustomRedisClient;

export function start(): void {
    if (client) {
        throw new Error("Redis client already established");
    }

    connect();
}

function connect(): CustomRedisClient {
    const options = {
        host: "redis",
        port: +process.env.REDIS_PORT!,
        password: process.env.REDIS_PASSWORD,
    };
    const syncClient = redis.createClient(options);
    client = asyncClient(syncClient);

    return client;
}

function asyncClient(client: redis.RedisClient): CustomRedisClient {
    const getAsync: CustomRedisClient["get"] = promisify(client.get).bind(
        client
    );
    const setAsync: CustomRedisClient["set"] = promisify(client.set).bind(
        client
    );
    // const existsAsync: Promise<boolean> = promisify(client.exists).bind(client);

    const newClient = {
        ...client,
        get: getAsync,
        set: setAsync,
        // exists: existsAsync,
    };

    return newClient;
}

export { client };
