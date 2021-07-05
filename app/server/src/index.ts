import express from "express";

import * as connection from "./database/connection";
import Routes from "./routes/";
import errorHandler from "./middlewares/ErrorHandler";

import cors from "cors";
// connects to database
const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

// app.use(errorHandler);

connection.connect().then((connection) => {
    connection.runMigrations();

    const port = 3333;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});

export { app };
