import { getCustomRepository } from "typeorm";

import * as connectionManager from "../database/connection";

import { NewsRepository } from "../repositories/NewsRepository";
/*
 * -> Esse teste deve ser feito com o banco vazio
 * -> Testa a conexão direta com o banco (sem usar controllers)
 * roda as migrations,
 * cria o objeto teste,
 * salva, busca, atualiza e deleta o objeto teste
 */
describe("Direct Database Connection Test Suite", () => {
    const testObject = {
        title: "Test #",
        link: "http://localhost:3333/test-3",
        from: "Jest",
    };

    beforeAll(async (done) => {
        try {
            await connectionManager.connect();
            await connectionManager.connection.runMigrations();

            // this part is absurd, i know
            const repo = getCustomRepository(NewsRepository);
            const result = await repo.find({ link: testObject.link });

            if (result) {
                await repo.delete({ link: testObject.link });
            }
            //

            done();
        } catch (error) {
            done(error);
        }
    });

    afterAll(async (done) => {
        try {
            connectionManager.disconnect();
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should save one register to the database", async (done) => {
        try {
            const repo = getCustomRepository(NewsRepository);
            const data = await repo.createAndSave(testObject);

            expect(data).toHaveProperty("id");
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should fetch news from database", async (done) => {
        try {
            const repo = getCustomRepository(NewsRepository);
            const data = await repo.findByTitle(testObject.title);

            expect(data[0]).toHaveProperty("link");
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should update a row", async (done) => {
        const repo = getCustomRepository(NewsRepository);
        const newTitle = "Test #666";
        try {
            await repo.updateOne(testObject, {
                title: newTitle,
            });

            const record = await repo.findOne({ link: testObject.link });

            expect(record?.title).toBe(newTitle);

            done();
        } catch (error) {
            console.log(error);

            done(error);
        }
    });

    it("should delete a row", async (done) => {
        const repo = getCustomRepository(NewsRepository);

        try {
            await repo.delete({ link: testObject.link });
            const record = await repo.findOne({ link: testObject.link });

            expect(record).toBe(undefined);

            done();
        } catch (error) {
            console.error(error);

            done(error);
        }
    });
});
