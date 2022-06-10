import { Router } from "express";

import NewsController from "../controllers/NewsController";
import { optionalAuth, bearerAuth } from "../middlewares/Auth";

const newsRoute = Router();

newsRoute.get("/", optionalAuth, NewsController.index);
newsRoute.get("/search", optionalAuth, NewsController.search);
newsRoute.get("/:id", optionalAuth, NewsController.getById);

newsRoute.post("/", bearerAuth, NewsController.create);
// newsRoute.patch("/", bearerAuth, NewsController.update);
// newsRoute.delete("/", bearerAuth, NewsController.delete);

export default newsRoute;
