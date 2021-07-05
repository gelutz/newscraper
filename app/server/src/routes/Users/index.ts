import { Router } from "express";

import UsersController from "../../controllers/UsersController";

const newsRoute = Router();

newsRoute.get("/:id", UsersController.getById);
newsRoute.post("/", UsersController.create);
newsRoute.patch("/:id", UsersController.update);

export default newsRoute;
