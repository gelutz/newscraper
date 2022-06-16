import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { NewsRepository } from '../repositories/NewsRepository';

class NewsController {
    async createFromWebscraping(req: Request, res: Response) {}

    async create(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);

        const data = { ...req.body };
        const created = await repository.createAndSave(data);

        return res.status(201).send({ ...created });
    }

    async index(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id, title, link, origin, date } = req.body;

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
    }

    async search(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { query } = req;

        const returned = await repository.ilike({
            title: query.title as string,
        });

        return res.status(201).send(returned);
    }

    async getById(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const id = req.params.id;

        const returned = await repository.findOneOrFail({ id: +id });

        let status: number = 404;
        if (returned?.id) {
            status = 200;
        }

        return res.status(status).send({ ...returned });
    }

    async update(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id } = req.body;
        const newValues = { ...req.body };

        const data = await repository.update({ id }, newValues);

        return res.send({ ...data });
    }

    async delete(req: Request, res: Response) {
        const repository = getCustomRepository(NewsRepository);
        const { id } = req.body;

        const data = await repository.delete({ id });

        return res.send({ ...data });
    }
}

export default new NewsController();
