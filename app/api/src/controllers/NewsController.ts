import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { NewsRepository } from "../repositories/NewsRepository";

class NewsController {
    async create(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);

        const data = req.body;
        try {
            const created = await repository.createAndSave(data);
            return res.status(201).send({ ...created });
        } catch (error) {
            return res.status(400).send({ message: "Error creating object" });
        }
    }

    async read(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id } = req.body;

        try {
            const returned = await repository.findOne({ id });
            let status: number = 404;
            if (returned?.id) {
                status = 200;
            }
            return res.status(status).send({ ...returned });
        } catch (error) {
            return res.status(500).send({
                message: "Error looking for object",
            });
        }
    }

    async update(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);

        const { id } = req.body;
        const newValues = { ...req.body };

        try {
            const data = await repository.update({ id }, newValues);

            return res.send({ ...data });
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id } = req.body;

        try {
            const data = await repository.delete({ id });

            return res.send({ ...data });
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController();
