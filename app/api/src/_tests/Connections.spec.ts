import { createConnection, getConnection } from "typeorm";
import { format } from "date-fns";
import config from "../database/ormconfig";

import News from "../models/News";

describe("testing database C.R.U.D.", () => {
    const date = format(Date.now(), "yyyy-MM-dd");

    const testObject = {
        id: 27,
        title: "Test #",
        date: date,
        link: "http://localhost:3333/test-",
        from: "Jest",
    };

    beforeAll(async (done) => {
        try {
            await createConnection(config);
            done();
        } catch (error) {
            done(error);
        }
    });

    afterAll(() => {
        const connection = getConnection();
        connection.close();
    });

    it("should save data to the database", async () => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        return repository
            .save(testObject)
            .then((data) => {
                console.log(data);

                expect(data).toHaveProperty("myass");
            })
            .catch((error) => {
                console.error(error);
            });
    });

    it("should fetch news from database", () => {
        const connection = getConnection();
        const repository = connection.getRepository(News);

        return repository.findOne({ id: 1 }).then((data) => {
            expect(data).toHaveProperty("id");
        });
    });

    // it("should update a row", () => {
    //     const connection = getConnection();
    //     const repository = connection.getRepository(News);

    //     return repository
    //         .update({ id: testObject.id }, { title: "Test #666" })
    //         .then((data) => {
    //             expect(data).toHaveProperty("affected");
    //         });
    // });

    // it("should delete a row", () => {
    //     const connection = getConnection();
    //     const repository = connection.getRepository(News);

    //     return repository.delete({ id: testObject.id });
    // });
});
