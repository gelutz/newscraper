import express from "express";
import cors from "cors";

import { xPowered } from "./middlewares/xPowered";

const app = express();
app.use(cors());
app.use(express.json());
app.use(xPowered);

export { app };
