import request from "supertest";

import { app } from "../index";
import * as connectionManager from "../database/connection";
import News from "models/News";
import { getCustomRepository } from "typeorm";
import { NewsRepository } from "../repositories/NewsRepository";

describe("Testing route: /", () => {
    const path = "/";

    beforeAll(async (done) => {
        try {
            await connectionManager.connect();

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

    describe("GET requests", () => {
        const existingData: Partial<News> = {
            title: "Test #1",
        };

        const nonExistingData: Partial<News> = {
            title: "Test #bibibooboo",
        };

        it("should respond with status 200 (OK)", async (done) => {
            const response = await request(app)
                .get(path)
                .send(existingData)
                .set("Accept", "application/json");

            console.log(response);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            done();
        });

        it("should respond with status 404 (Not Found)", async (done) => {
            request(app)
                .get(path)
                .send(nonExistingData)
                .set("Accept", "application/json")
                .end((err, res) => {
                    expect(res.status).toBe(404);
                    done(err);
                });
        });
    });

    describe("POST requests", () => {
        const data: Omit<News, "id"> = {
            title: "Foo",
            link: "Bar",
            date: new Date(),
            from: "Jest",
        };

        const invalidData = {
            title: "Foo",
        };

        beforeAll(async (done) => {
            try {
                // this part is absurd, i know
                const repo = getCustomRepository(NewsRepository);
                const result = await repo.find({ link: data.link });

                if (result) {
                    await repo.delete({ link: data.link });
                }
                //

                done();
            } catch (error) {
                done(error);
            }
        });

        it("should save and respond with 201 (Created)", async (done) => {
            const response = await request(app)
                .post(path)
                .send(data)
                .set("Accept", "application/json");

            expect(response.status).toBe(201);
            expect(response.body.title).toBe(data.title);
            done();
        });

        it("should not accept invalid data and return 400 (Bad Request)", async (done) => {
            request(app)
                .post(path)
                .send(data)
                .set("Accept", "application/json")
                .send(invalidData)
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    expect(res.body.message).toBe("Error creating object");
                    done(err);
                });
        });
    });
});
