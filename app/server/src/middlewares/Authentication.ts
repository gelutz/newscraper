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

    const token = authorization.replace("Bearer", "").trim();
    try {
        jwt.verify(token, process.env.JWT_KEY!);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError();
        }
    }

    return next();
}
