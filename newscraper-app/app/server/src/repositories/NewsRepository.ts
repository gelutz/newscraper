import News from "../models/News";
import {
    Brackets,
    EntityRepository,
    InsertResult,
    ObjectLiteral,
    Repository,
    UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface NewsQuery extends Partial<News> {
    title: string;
    link: string;
}

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
    // Usa a expressão ILIKE do postgres
    // e adiciona %% no início e
    async ilike(
        data: Partial<News>,
        columns: string[] = ["id", "title", "link", "origin", "date"]
    ): Promise<News[]> {
        const qb = this.createQueryBuilder().select(columns);

        Object.keys(data).forEach((c) => {
            if (data[c] === undefined) {
                return;
            }

            if (c === "title" || c === "link" || c === "origin") {
                data[c] = "%" + data[c]?.replace(" ", "%") + "%";

                qb.where(`${c} ilike :${c}`, data);

                return;
            }

            qb.where(`${c} = :${c}`, data);
        });

        try {
            return await qb.execute();
        } catch (error) {
            throw Error(error);
        }
    }

    async createAndSave(o: NewsQuery): Promise<News> {
        if (!o.title || !o.link) {
            throw Error(
                `Missing arguments:
                ${o.title ? "Title" : ""};
                ${o.link ? "Link" : ""}`
            );
        }
        const New = this.create();

        let saved: News;

        this.metadata.columns.forEach((v) => {
            New[v.propertyName] = o[v.propertyName];
        });

        try {
            saved = await this.save(New);
        } catch (error) {
            throw Error(error);
        }

        return saved;
    }

    async insertMany(data: NewsQuery[]): Promise<InsertResult> {
        const toBeInserted: Partial<NewsQuery>[] = [];

        data.forEach((newsInsert) => {
            const tmp = {};

            this.metadata.columns.forEach((column) => {
                tmp[column.propertyName] = newsInsert[column.propertyName];
            });
            toBeInserted.push(tmp);
        });

        return await this.createQueryBuilder()
            .insert()
            .into(News)
            .values(toBeInserted)
            .execute();
    }

    async updateOne(
        criteria: string | Brackets | ObjectLiteral | ObjectLiteral[],
        values: QueryDeepPartialEntity<News>
    ): Promise<UpdateResult> {
        const qr = this.createQueryBuilder("news")
            .update()
            .set(values)
            .where(criteria);
        return await qr.execute();
    }
}
