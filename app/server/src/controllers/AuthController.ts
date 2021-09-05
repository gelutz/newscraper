import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { config } from "dotenv";
import bcrypt from "bcrypt";

import { UsersRepository } from "../repositories/UsersRepository";
import { getTokenPair } from "../utils/token";
import Allowlist from "../repositories/Allowlist";
import TokenExpiredError from "../errors/TokenExpired";
config();

class AuthController {
    async login(req: Request, res: Response) {
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

        const [access, opaque] = await getTokenPair({ login });
        res.send({ opaque, access, user });
    }

    async refreshTokens(req: Request, res: Response) {
        const { opaque } = req.body;

        // verificar o token no allowlist
        const payload = await Allowlist.find(opaque);

        if (new Date(payload) < new Date()) {
            throw new TokenExpiredError("opaque");
        }

        // excluir o token do allowlist
        await Allowlist.delete(opaque);

        const [access, newOpaque] = await getTokenPair({
            login: req.body.login,
        });

        res.set({ Authorization: access });
        res.status(200).send({ message: newOpaque });
    }
}

export default new AuthController();
