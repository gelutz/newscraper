import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

// TODO: adicionar validação de tempo usando os atributos iat e exp
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

    jwt.verify(token, process.env.JWT_KEY!);
    return next();
}
