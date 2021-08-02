import "express-async-errors";
import cors from "cors";
import express from "express";

import * as postgresClient from "./database/postgresql/client";
import * as redisClient from "./database/redis/client";

import Routes from "./routes/";

import { errorHandler } from "./middlewares/ErrorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.use(errorHandler);

redisClient.start();

postgresClient.start().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});

export { app };
