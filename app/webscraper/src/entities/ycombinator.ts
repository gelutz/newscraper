import axios from "axios";
import cheerio from "cheerio";
import { News } from "../@types/News";
import { Site } from "../@types/Site";

export class Ycombinator implements Site {
    name: string = "Ycombinator";
    baseURL: string = "https://news.ycombinator.com/";

    async search(): Promise<News[]> {
        const AxiosInstance = axios.create();
        const news: News[] = [];

        const response = await AxiosInstance.get(this.baseURL);

        const html = response.data;
        const $ = cheerio.load(html);

        const rows = $("table .itemlist > tbody > tr");

        rows.each((i, elem) => {
            if (i % 3 !== 0) {
                return;
            }

            // title and link
            const td = $(elem).find("td").find(".storylink");
            const title = $(td).text();

            if (!title) {
                return;
            }

            const link = $(td).attr("href") ?? "";
            news.push({
                title,
                link,
                origin: this.baseURL,
                date: new Date(),
            });
        });

        return news;
    }
}

export default new Ycombinator();
