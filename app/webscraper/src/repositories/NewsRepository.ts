import { News } from "../@types/News";
import { api } from "../api/connection";

export class NewsRepository {
    async save({ ...news }: News) {
        const response = await api.post("/news", { ...news });

        return response;
    }
}
