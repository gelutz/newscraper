import News from '../models/News';
import {
    Brackets,
    EntityRepository,
    InsertResult,
    ObjectLiteral,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
    // Usa a expressão ILIKE do postgres
    // e adiciona %% no início e fim das strings
    async ilike(
        data: Partial<News>,
        columns: string[] = ['id', 'title', 'link', 'origin', 'date']
    ): Promise<News[]> {
        const qb = this.createQueryBuilder().select(columns);

        Object.keys(data).forEach((c) => {
            if (data[c] === undefined) {
                return;
            }

            if (c === 'title' || c === 'link' || c === 'origin') {
                data[c] = '%' + data[c]?.replace(' ', '%') + '%';

                qb.where(`${c} ilike :${c}`, data);

                return;
            }

            qb.where(`${c} = :${c}`, data);
        });

        return await qb.execute();
    }

    async createAndSave(o: Partial<News>): Promise<News> {
        if (!o.title || !o.link) {
            throw Error(
                `Missing arguments:
                ${o.title ? 'Title' : ''};
                ${o.link ? 'Link' : ''}`
            );
        }
        const New = this.create();

        this.metadata.columns.forEach((v) => {
            New[v.propertyName] = o[v.propertyName];
        });

        const saved: News = await this.save(New);

        return saved;
    }

    async insertMany(data: Partial<News>[]): Promise<InsertResult> {
        const toBeInserted: Partial<Partial<News>>[] = [];

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
        const qr = this.createQueryBuilder('news')
            .update()
            .set(values)
            .where(criteria);
        return await qr.execute();
    }
}
