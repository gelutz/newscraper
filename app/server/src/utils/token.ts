import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import Allowlist from '../repositories/Allowlist';
import endOfWeek from 'date-fns/endOfWeek';
export function getAccessToken({ ...payload }): string {
    return sign({ ...payload }, process.env.JWT_KEY!, {
        expiresIn: '5m',
    });
}

export function getOpaqueToken(): string {
    return randomBytes(16).toString('hex');
}

export async function getTokenPair({
    ...accessPayload
}): Promise<[string, string]> {
    const accessToken = getAccessToken(accessPayload);
    const opaqueToken = getOpaqueToken();

    await Allowlist.save(opaqueToken, {
        exp: endOfWeek(new Date()).toLocaleString(),
    });

    return [accessToken, opaqueToken];
}
