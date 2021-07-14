import { Request, Response } from "express";
import ycombinator from "../entities/ycombinator";
import { NewsRepository } from "../repositories/NewsRepository";

class SearchNewsController {
    async handle(request: Request, response: Response) {
        const news = await ycombinator.search();

        const newsRepository = new NewsRepository();
        let enviadas = 0;

        try {
            for (let index = 0; index < news.length; index++) {
                enviadas++;
                console.log(enviadas);
                await newsRepository.save(news[index]);
            }

            response.status(201).send({
                message: `Script rodou sem problemas. ${enviadas} notícias enviadas.`,
            });
        } catch (err) {
            response.status(500).send({ ...err });
        }
    }
}

export default new SearchNewsController();
