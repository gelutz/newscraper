import { Router } from "express";

import NewsController from "../controllers/NewsController";
const newsRoute = Router();

newsRoute.get("/", NewsController.index);
newsRoute.get("/search", NewsController.search);
newsRoute.get("/:id", NewsController.getById);
newsRoute.post("/", NewsController.create);
// newsRoute.patch("/", NewsController.update);
// newsRoute.delete("/", NewsController.delete);

export default newsRoute;
