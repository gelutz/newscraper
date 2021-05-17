import News from "../models/News";
import {
    Brackets,
    EntityRepository,
    InsertResult,
    ObjectLiteral,
    Repository,
    UpdateResult,
} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface NewsQuery extends Partial<News> {
    title: string;
    link: string;
}

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
    async findByTitle(
        title: string = "",
        specific: boolean = true
    ): Promise<News[]> {
        if (!specific) {
            title = "%" + title + "%";
        }

        try {
            const result = await this.createQueryBuilder("news")
                .where("news.title = :title", { title: title })
                .getMany();

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createAndSave(o: NewsQuery): Promise<News> {
        const New = this.create();

        this.metadata.columns.forEach((v) => {
            New[v.propertyName] = o[v.propertyName];
        });
        const saved = await this.save(New);

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
        if (this.manager.connection.options.type === "postgres") {
            qr.returning("id");
        }
        return await qr.execute();
    }
}
