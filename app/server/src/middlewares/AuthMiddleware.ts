import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET!);

        const { id } = data as TokenPayload;

        req.body.userId = id;

        return next();
    } catch {
        return res.sendStatus(401);
    }
}
