import express from "express";
import { createConnection } from "typeorm";

import config from "./database/ormconfig";
import Routes from "./routes";
// connects to database
const app = express();
app.use(Routes);

createConnection(config)
    .then((connection) =>
        console.log(`Conected to database at ${connection.options["host"]}`)
    )
    .catch((error) => console.log(error));

app.listen(3333, () => console.log("Server running at 3333"));
