import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
    async create(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);

        const data = { ...req.body };
        try {
            const created = await repository.save(data);

            return res.status(201).send({ ...created });
        } catch (error) {
            console.log("Erro:", error.message);
            return res.status(400).send({ name: error.name });
        }
    }

    async getById(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const id = req.params.id;

        try {
            const returned = await repository.find({
                where: { id: id },
            });

            let status: number = 404;
            if (returned.length > 0) {
                status = 200;
            }

            return res.status(status).send({ ...returned });
        } catch (error) {
            console.log("Erro:", error.message);
            return res
                .status(404)
                .send({ name: error.name ?? "An error ocurred." });
        }
    }

    async update(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const { id } = req.params;
        const newValues = { ...req.body };

        try {
            const data = await repository.update({ id }, newValues);

            return res.send({ ...data });
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const { id } = req.body;

        try {
            const data = await repository.delete({ id });

            return res.send({ ...data });
        } catch (error) {
            return res
                .status(500)
                .send({ name: error.name, message: error.message });
        }
    }
}

export default new UsersController();
