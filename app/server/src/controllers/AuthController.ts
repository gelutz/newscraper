import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import bcrypt from "bcrypt";
import User from "../models/Users";

config();

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { login, password } = req.body;

        const user = await repository.findOne({ where: { login } });

        if (!user?.password) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
            expiresIn: "1h",
        });

        return res.json({
            user,
            token,
        });
    }
}

export default new AuthController();
