import Users from "../models/Users";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    // isAuthenticated({}: Omit<Users, "")

    // this saves the object with a hashed password (@BeforeInsert doesnt work with .save alone)
    async saveHashed(
        object: Partial<Users>
    ): Promise<Partial<Omit<Users, "password">>> {
        const user = this.create({ ...object });
        const saved: Partial<Users> = await this.save(user);
        delete saved.password;

        return saved;
    }
        });
}
