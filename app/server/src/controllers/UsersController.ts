import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
    async create(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);

        const data = { ...req.body };
        const created = await repository.saveHashed(data);

        return res.status(201).send({ ...created });
    }

    async getById(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const id = req.params.id;

        const returned = await repository.findOneOrFail({
            id,
        });

        return res.status(200).send({ ...returned });
    }

    async update(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const newValues = { ...req.body };
        const { id } = req.params;

        const data = await repository.updateOne({ id }, newValues);

        return res.status(204).send({ ...data });
    }

    async delete(req: Request, res: Response) {
        const repository = getCustomRepository(UsersRepository);
        const { id } = req.params;

        try {
            const data = await repository.delete({ id });

            return res.send({ ...data });
        } catch (error) {
            return res.status(500).send({ ...error });
        }
    }
}

export default new UsersController();
