import { Router } from "express";

import NewsController from "./controllers/NewsController";
const routes = Router();

routes.get("/", NewsController.read);
routes.post("/", NewsController.create);
routes.patch("/", NewsController.update);
routes.delete("/", NewsController.delete);

export default routes;
