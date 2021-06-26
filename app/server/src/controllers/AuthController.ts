import { Request, Response } from "express";
import { getRepository } from "typeorm";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import User from "../models/Users";

config();

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { login, password } = req.body;
        console.log("oi");

        const user = await repository.findOne({ where: { login } });

        if (!user?.password) {
            return res.sendStatus(401);
        }

        // const isValidPassword = await bcrypt.compare(password, user.password);
        const isValidPassword = password === user.password;
        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        return res.json({
            user,
            token,
        });
    }
}

export default new AuthController();