import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { config } from "dotenv";

import bcrypt from "bcrypt";
import { UsersRepository } from "../repositories/UsersRepository";

config();

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { login, password } = req.body;

        const repository = getCustomRepository(UsersRepository);

        const user = await repository.findOne({ login });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(404).send({ message: "Unvalid password" });
        }

        const token = await repository.generateToken({ login });
        return res.send({ token, login });
    }
}

export default new AuthController();
