import jwt from "jsonwebtoken";

export async function generateToken({ ...payload }): Promise<string> {
    const token = jwt.sign({ ...payload }, process.env.JWT_KEY!, {
        expiresIn: "1h",
    });

    return token;
}
