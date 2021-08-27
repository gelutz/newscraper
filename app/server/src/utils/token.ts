import { sign } from "jsonwebtoken";
import { randomBytes } from "crypto";
import endOfWeek from "date-fns/endOfWeek";

import Allowlist from "../repositories/Allowlist";
import { JWT_KEY } from "../config/environment";

export async function getAccessToken({ ...payload }): Promise<string> {
    const token = sign({ ...payload }, JWT_KEY, {
        expiresIn: "5m",
    });

    return token;
}

export function getOpaqueToken(): string {
    return randomBytes(16).toString("hex");
}

export async function getTokenPair({
    ...accessPayload
}): Promise<[string, string]> {
    const accessToken = await getAccessToken(accessPayload);
    const opaqueToken = getOpaqueToken();

    await Allowlist.save(opaqueToken, {
        exp: endOfWeek(new Date()).toLocaleString(),
    });

    return [accessToken, opaqueToken];
}
