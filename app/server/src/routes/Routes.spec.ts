import request from "supertest";
import { getCustomRepository } from "typeorm";

import News from "models/News";
import { app } from "../index";
import { NewsRepository } from "../repositories/NewsRepository";
import * as connectionManager from "../database/connection";

describe("Testing route: /", () => {
    const path = "/";

    beforeAll(async (done) => {
        try {
            await connectionManager.start();
            const repo = getCustomRepository(NewsRepository);
            await repo.createAndSave({
                title: "Teste #1",
                link: "localhost:3000/teste",
            });

            done();
        } catch (error) {
            done(error);
        }
    });

    afterAll(async (done) => {
        try {
            await connectionManager.disconnect();

            done();
        } catch (error) {
            done(error);
        }
    });

    /**
     * - GET REQUESTS
     */
    describe("GET", () => {
        // theres an insert in the first migration file that creates this object
        const existingData: Partial<News> = {
            id: 1,
            title: "Teste #1",
        };

        const nonExistingData: Partial<News> = {
            id: 999,
            title: "Test #bibibooboo",
        };

        it("indexing data with URL params should return 200 (OK)", async (done) => {
            try {
                const response = await request(app)
                    .get(`${path}${existingData.id}`)
                    .set("Accept", "application/json");

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("id", 1);
                done();
            } catch (error) {
                done(error);
            }
        });

        it("indexing nonexisting data with URL params should return 404 (Not found)", async (done) => {
            try {
                const response = await request(app)
                    .get(`${path}${nonExistingData.id}`)
                    .set("Accept", "Application/json");

                expect(response.status).toBe(404);
                expect(response.body).toHaveProperty(["name"]);

                done();
            } catch (error) {
                done(error);
            }
        });

        it("indexing with partial title should return 200 (OK)", async (done) => {
            try {
                const response = await request(app)
                    .get(`${path}`)
                    .send({ title: existingData.title })
                    .set("Accept", "application/json");

                expect(response.status).toBe(200);
                expect(response.body[0]).toHaveProperty("id");

                done();
            } catch (error) {
                done(error);
            }
        });

        it("indexing with nonexisting title should return 404 (Not Found)", async (done) => {
            try {
                const response = await request(app)
                    .get(path)
                    .send({ title: nonExistingData.title })
                    .set("Accept", "application/json");

                expect(response.status).toBe(404);
                expect(response.body).toEqual({});

                done();
            } catch (error) {
                done(error);
            }
        });
    });

    /**
     * - POST REQUESTS
     */
    describe("POST", () => {
        const completeObj: Omit<News, "id"> = {
            title: "Foo",
            link: "Bar",
            date: new Date(),
            origin: "Jest",
        };

        const incompleteObj = {
            title: "Foo",
        };

        beforeAll(async (done) => {
            try {
                // this part is absurd, i know
                const repo = getCustomRepository(NewsRepository);
                const result = await repo.find({ link: completeObj.link });

                if (result) {
                    await repo.delete({ link: completeObj.link });
                }
                //

                done();
            } catch (error) {
                done(error);
            }
        });

        it("should save and return 201 (Created)", async (done) => {
            try {
                const response = await request(app)
                    .post(path)
                    .send(completeObj)
                    .set("Accept", "application/json");

                expect(response.status).toBe(201);
                expect(response.body.title).toBe(completeObj.title);

                done();
            } catch (error) {
                done(error);
            }
        });

        it("should not accept and return 400 (Bad Request)", async (done) => {
            try {
                const response = await request(app)
                    .post(path)
                    .set("Accept", "application/json")
                    .send(incompleteObj);

                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty(["name"]);

                done();
            } catch (error) {
                done(error);
            }
        });
    });

    /**
     * - PATCH REQUESTS
     */
    describe("PATCH", () => {
        const existingData: Partial<News> = {
            id: 1,
            title: "F",
        };

        it("should update and return ");
    });
});
