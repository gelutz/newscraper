import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { config } from "dotenv";
import UnauthorizedError from "../errors/UnauthorizedError";
import TokenExpiredError from "../errors/TokenExpired";
config();

export function bearerAuth(req: Request, _: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new UnauthorizedError();
    }

    console.log(
        "🚀 ~ file: Auth.ts ~ line 9 ~ bearerAuth ~ bearerAuth",
        new Date()
    );
    const token = authorization.replace("Bearer ", "");
    try {
        jwt.verify(token, process.env.JWT_KEY!);
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            if (err.message === "Token expirado") {
                throw new TokenExpiredError("access");
            }

            if (err.message === "invalid token") {
                throw new UnauthorizedError();
            }
        }
    }
    next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        bearerAuth(req, res, next);
    } else {
        next();
    }
}
