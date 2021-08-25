import CustomError from "../errors/CustomError";
import { Application, NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorHandler = (app: Application) => {
    app.use(handler);
};

const handler = (err: Error, _: Request, res: Response, next: NextFunction) => {
    let error: Pick<Error, "name" | "message"> = err;
    let status: number = 500;

    if (err instanceof CustomError) {
        status = err.status;
    }

    if (err instanceof EntityNotFoundError) {
        status = 404;
        error = {
            name: err.name,
            message: "Nenhum objeto foi encontrado",
        };
    }

    if (err instanceof JsonWebTokenError) {
        status = 401;
        error = {
            name: err.name,
            message: "Token inválido",
        };
    }
    next();
    res.status(status).send(error);
};
