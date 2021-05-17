import "reflect-metadata";
import { connect } from "./database/connection";
import { NewsRepository, INewsInsert } from "./repositories/NewsRepository";
import { getCustomRepository } from "typeorm";
connect();

const repository = getCustomRepository(NewsRepository);
repository.findByTitle().then((result) => {
    console.log(result);
});

repository.find().then((result) => {
    console.log(result);
});

const noticia: INewsInsert = {
    title: "Teste #1",
    link: "src/test.ts",
};
repository.createAndSave(noticia).then((result) => {
    console.log(noticia);
});
