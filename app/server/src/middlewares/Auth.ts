import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import UnauthorizedError from "../errors/UnauthorizedError";
config();

export function requiredAuth(req: Request, _: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new UnauthorizedError();
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY!);

    next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        requiredAuth(req, res, next);
    } else {
        next();
    }
}
