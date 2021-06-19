import express from "express";

import * as connection from "./database/connection";
import Routes from "./routes/";
import cors from "cors";
// connects to database
const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

connection.connect().then((connection) => {
    connection.runMigrations();
    app.listen(3333, () => console.log("Server running at 3333"));
});

export { app };
