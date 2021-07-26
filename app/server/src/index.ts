// import "express-async-errors";
import express, { Request, Response } from "express";

import * as connection from "./database/connection";
import Routes from "./routes/";

import cors from "cors";
// connects to database
const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

// handling errors
// app.use((err: Error, _: Request, res: Response) => {
//     if (err instanceof Error) {
//         return res.status(404).send({
//             name: err.name,
//             message: err.message,
//         });
//     }
//     console.error(err);
//     return res.status(500).send({ message: "Internal server error" });
// });

// waits for db connection and migrations to run, and starts the server
connection.start().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});

export { app };
