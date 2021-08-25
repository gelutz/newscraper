import redis from "redis";
import { promisify } from "util";

type CustomRedisClient = {
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<boolean>;
    del(key: string): Promise<boolean>;
    // exists: Promise<boolean>;
};

let client: CustomRedisClient;

function start(): void {
    if (client) {
        throw new Error("Redis client already established");
    }

    connect();
}

function connect(): CustomRedisClient {
    const options = {
        host: "redis",
        port: +process.env.REDIS_PORT!,
        // password: process.env.REDIS_PASSWORD,
    };
    const syncClient = redis.createClient(options);
    client = asyncClient(syncClient);

    return client;
}

const asyncClient = (client: redis.RedisClient): CustomRedisClient => {
    return {
        ...client,
        get: promisify(client.get).bind(client),
        set: promisify(client.set).bind(client),
        del: promisify(client.del).bind(client),
    };
};

export { client, start };
