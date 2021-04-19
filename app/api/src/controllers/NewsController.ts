import { Request, Response } from "express";
import { getRepository } from "typeorm";

import News from "../models/News";

// interface NewsRequest extends Request {
//     id: number;
//     title: string;
//     link: string;
//     from: string;
//     date: Date;
// }

class NewsController {
    async create(req: Request, res: Response) {
        const repository = getRepository(News);

        const data = req.body;
        try {
            const updated = await repository.save(data);

            res.send({ ...updated });
        } catch (error) {
            console.error(error);
        }
    }

    async read(req: Request, res: Response) {
        const repository = getRepository(News);
        const { id } = req.body;

        try {
            const returnedNews = await repository.findOne({ id });

            res.send({ ...returnedNews });
        } catch (error) {
            console.error(error);
        }
    }

    async update(req: Request, res: Response) {
        const repository = getRepository(News);

        const { id } = req.body;
        const newValues = { ...req.body };

        try {
            const data = await repository.update({ id }, newValues);

            res.send({ ...data });
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req: Request, res: Response) {
        const repository = getRepository(News);
        const { id } = req.body;

        try {
            const data = await repository.delete({ id });

            res.send({ ...data });
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController();
