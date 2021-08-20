import CustomError from "../errors/CustomError";
import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";

export const errorHandler = (
    err: Error,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.status).send({
            name: err.name,
            message: err.message,
        });
    }

    if (err instanceof EntityNotFoundError) {
        return res.status(404).send({
            name: err.name,
            message: "Nenhum objeto foi encontrado",
        });
    }

    console.log(err);
    next(err);
};
