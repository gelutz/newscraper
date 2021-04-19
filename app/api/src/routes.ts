import { Router } from "express";

import NewsController from "./controllers/NewsController";
const routes = Router();

routes.get("/", NewsController.read);
routes.post("/", NewsController.create);

export default routes;
