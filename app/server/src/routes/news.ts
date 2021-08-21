import { Router } from "express";

import NewsController from "../controllers/NewsController";
import { optionalAuth, requiredAuth } from "../middlewares/Auth";

const newsRoute = Router();

newsRoute.get("/", optionalAuth, NewsController.index);
newsRoute.get("/search", optionalAuth, NewsController.search);
newsRoute.get("/:id", optionalAuth, NewsController.getById);

newsRoute.post("/", requiredAuth, NewsController.create);
// newsRoute.patch("/", requiredAuth, NewsController.update);
// newsRoute.delete("/", requiredAuth, NewsController.delete);

export default newsRoute;
