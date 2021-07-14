import { News } from "../@types/News";
import { api } from "../database/api";

export class NewsRepository {
    async save({ ...news }: News) {
        if (!news.title || !news.link) {
            throw new Error("Missing important information");
        }

        console.log(news);
        try {
            const response = await api.post("/", { ...news });
            console.log(response);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
