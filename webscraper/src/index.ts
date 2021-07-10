import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

/* Rotas */
app.get("/research");

/* Middlaware de erro */
