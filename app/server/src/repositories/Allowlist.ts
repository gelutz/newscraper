import { client } from "../database/connections/redis";

class Allowlist {
    find = async (token: string): Promise<string> => {
        const data = await client.get(token);

        return data;
    };

    save = async (token: string, { exp }: { exp: string }) => {
        return await client.set(token, exp);
    };

    delete = async (token: string) => {
        return await client.del(token);
    };
}

export default new Allowlist();
