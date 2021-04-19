import { createConnection, getConnection } from "typeorm";
import { format } from "date-fns";
import config from "../database/ormconfig";

import News from "../models/News";

/*
 * -> Esse teste deve ser feito com o banco vazio
 * -> Testa a conexão direta com o banco (sem usar controllers)
 * roda as migrations,
 * cria o objeto teste,
 * salva, busca, atualiza e deleta o objeto teste
 */
describe("Direct Database Connection Test Suite", () => {
    const date = format(Date.now(), "yyyy-MM-dd");

    const testObject = {
        id: 27,
        title: "Test #",
        date: date,
        link: "http://localhost:3333/test-",
        from: "Jest",
    };

    const mockedConfig = { ...config, host: "172.19.0.2" };
    beforeAll(async (done) => {
        try {
            const connection = await createConnection(mockedConfig);
            await connection.runMigrations();
            done();
        } catch (error) {
            done(error);
        }
    });

    afterAll(() => {
        const connection = getConnection();

        connection.close();
    });

    it("should save data to the database", async (done) => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        try {
            const data = await repository.save(testObject);

            expect(data).toHaveProperty("id");
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should fetch news from database", async (done) => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        try {
            const data = await repository.findOne({ id: 1 });

            expect(data).toHaveProperty("id");
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should update a row", async (done) => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        try {
            const data = await repository.update(
                { id: testObject.id },
                { title: "Test #666" }
            );

            expect(data).toHaveProperty("affected");
            done();
        } catch (error) {
            done(error);
        }
    });

    it("should delete a row", async (done) => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        try {
            const data = await repository.delete({ id: testObject.id });

            expect(data).toBeTruthy();
            done();
        } catch (error) {
            done(error);
        }
    });
});
