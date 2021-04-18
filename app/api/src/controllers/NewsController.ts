import { Request, Response } from "express";
import { getRepository } from "typeorm";

import New from "../models/News";

// 04/2021 - express não vem mais com body-parser, req.body é undefined
interface NewsRequest extends Request {
    body: {
        id: number;
        title: string;
        link: string;
        from: string;
        date: Date;
    };
}

class NewsController {
    async index(req: NewsRequest, res: Response) {
        const repository = getRepository(New);

        const { id, title, link } = req.body;

        const returnedNews = await repository.findOne({ id, title, link });

        res.send({ ...returnedNews });
    }

    async store(req: NewsRequest, res: Response) {
        const repository = getRepository(New);

        const data = req.body;
        try {
            const updated = await repository.save(data);

            res.send({ ...updated });
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController();
