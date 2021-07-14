import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SearchNewsController from "./controllers/SearchNewsController";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        // allowedHeaders: "Acess-Control-Allow-Origin",
        // origin: "server:3333",
    })
);

/* Rotas */
app.post("/research", SearchNewsController.handle);

/* TODO: Middlaware de erro */
const port = process.env.SERVICE_PORT;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
