import { Request, Response } from "express";
import "express-async-errors";

export default function errorHandler(err: Error, _: Request, res: Response) {
    if (err instanceof Error) {
        return res.status(404).send({
            name: err.name,
            message: err.message,
        });
    }

    return res.status(500).send({ message: "Internal server error" });
}
