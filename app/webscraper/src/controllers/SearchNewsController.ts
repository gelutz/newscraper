import { Request, Response } from "express";
import ycombinator from "../entities/ycombinator";
import { NewsRepository } from "../repositories/NewsRepository";

class SearchNewsController {
    async handle(request: Request, response: Response) {
        const news = await ycombinator.search();

        const newsRepository = new NewsRepository();
        let quantEnviadas = 0;

        try {
            for (const New of news) {
                quantEnviadas++;
                console.log(quantEnviadas);
                await newsRepository.save(New);
            }

            response.status(201).send({
                message: `Script rodou sem problemas. ${quantEnviadas} notícias enviadas.`,
            });
        } catch (err) {
            console.error(err);
            response.status(500).send(err);
        }
    }
}

export default new SearchNewsController();
