import Users from "../models/Users";
import { EntityRepository, Repository } from "typeorm";

export interface UsersQuery extends Partial<Users> {
    nome: string;
    link: string;
}

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}
