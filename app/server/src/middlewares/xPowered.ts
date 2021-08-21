import { Request, Response, NextFunction } from "express";

export const xPowered = (_: Request, res: Response, next: NextFunction) => {
    res.set({
        "X-Powered-By": "The Lutz",
    });

    return next();
};
