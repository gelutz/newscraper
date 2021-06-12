import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { NewsRepository } from "../repositories/NewsRepository";

class NewsController {
    async create(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);

        const data = { ...req.body };
        try {
            const created = await repository.createAndSave(data);

            return res.status(201).send({ ...created });
        } catch (error) {
            console.log("Erro:", error.message);
            return res.status(400).send({ name: error.name });
        }
    }

    async index(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id, title, link, origin, date } = req.body;

        try {
            const returned = await repository.ilike({
                id,
                title,
                link,
                origin,
                date,
            });

            let status = 404;
            if (returned.length > 0) {
                status = 200;
            }

            return res.status(status).send({ ...returned });
        } catch (error) {
            console.log("Erro:", error.message);
            return res.status(404).send({ name: error.name });
        }
    }

    async getById(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const id = req.params.id;

        try {
            const returned = await repository.findOneOrFail({ id: +id });

            let status: number = 404;
            if (returned?.id) {
                status = 200;
            }

            return res.status(status).send({ ...returned });
        } catch (error) {
            console.log("Erro:", error.message);
            return res
                .status(404)
                .send({ name: error.name ?? "Object not found" });
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
            return res
                .status(500)
                .send({ name: error.name, message: error.message });
        }
    }
}

export default new NewsController();
