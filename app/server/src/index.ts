import "express-async-errors";
import cors from "cors";
import express from "express";

import * as connection from "./database/connection";
import Routes from "./routes/";
import { errorHandler } from "./middlewares/ErrorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.use(errorHandler);

// waits for db connection and migrations to run, and starts the server
connection.start().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});

export { app };
