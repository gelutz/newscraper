import { client } from "../database/connections/redis";

const findToken = async (token: string): Promise<boolean> => {
    const data = await client.get(token);

    return !!data;
};

const saveToken = async (token: string) => {
    // the token itself is already enough for the blocklist
    return await client.set(token, "");
};

export { findToken, saveToken };
