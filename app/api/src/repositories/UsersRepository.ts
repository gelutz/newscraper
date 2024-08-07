import Users from '../models/Users';
import { EntityRepository, Repository } from 'typeorm';

import NotFoundError from '../errors/NotFoundError';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    async updateOne(
        criteria: Partial<Users>,
        values: Partial<Users>
    ): Promise<Users> {
        const user = await this.findOne(criteria);

        if (!user) {
            throw new NotFoundError(Users);
        }

        Object.assign(user, values);
        return await this.save(user);
    }

    // this saves the object with a hashed password (@BeforeInsert doesnt work with .save alone)
    async saveHashed(
        object: Partial<Users>
    ): Promise<Partial<Omit<Users, 'password'>>> {
        const user = this.create({ ...object });
        const saved: Partial<Users> = await this.save(user);
        delete saved.password;

        return saved;
    }
}
