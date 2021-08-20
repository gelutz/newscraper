import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import UnauthorizedError from "../errors/UnauthorizedError";

config();

// TODO: adicionar validação de tempo usando os atributos iat e exp
export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace("Bearer", "");
    try {
        jwt.verify(token, process.env.JWT_KEY!);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError();
        }
    }

    return next();
}

export function refreshTokens(req: Request, _: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (authorization) {
        next();
    }

    const token = authorization!.replace("Bearer ", "");
    const data = jwt.decode(token);
    // iat and shit
    // if ()
}
