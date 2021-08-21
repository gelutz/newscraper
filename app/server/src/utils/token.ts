import { sign } from "jsonwebtoken";

export async function generateToken({ ...payload }): Promise<string> {
    const token = sign({ ...payload }, process.env.JWT_KEY!, {
        expiresIn: "5m",
    });

    return token;
}
