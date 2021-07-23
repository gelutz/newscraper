import { News } from "../@types/News";
import { api } from "../api/connection";

export class NewsRepository {
    async save({ ...news }: News) {
        try {
            const response = await api.post("/news", { ...news });

            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
