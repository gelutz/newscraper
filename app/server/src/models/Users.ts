import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
class Users {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}

export default Users;
