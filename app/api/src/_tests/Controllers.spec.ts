import { format } from "date-fns";
import { Request, Response } from "express";
import { createConnection, getConnection } from "typeorm";

import NewsController from "../controllers/NewsController";
import config from "../database/ormconfig";

describe("NewsController Test Suite", () => {
    const date = format(Date.now(), "yyyy-MM-dd");
    const mockedRequest = {
        body: {
            id: 27,
            title: "Test #",
            date: date,
            link: "http://localhost:3333/test-",
            from: "Jest",
        },
    } as Request;

    const mockedResponse = {
        send: (value) => value,
    } as Response;

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

    it("should save given records", async (done) => {
        const inserted = await NewsController.create(
            mockedRequest,
            mockedResponse
        );

        expect(inserted).toBeTruthy();
        done();
    });

    it("should find saved records", async (done) => {
        try {
            const data = await NewsController.read(
                mockedRequest,
                mockedResponse
            );

            expect(data).toBe({
                ...mockedRequest.body,
            });

            done();
        } catch (error) {
            done(error);
        }
    });

    it("should delete saved records", async (done) => {
        try {
            const data = await NewsController.delete(
                mockedRequest,
                mockedResponse
            );

            expect(data).toBe({
                ...mockedRequest.body,
            });

            done();
        } catch (error) {
            done(error);
        }
    });
});
