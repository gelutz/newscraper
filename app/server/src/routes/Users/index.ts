import { Router } from "express";

import UsersController from "../../controllers/UsersController";

import AuthController from "../../controllers/AuthController";
const newsRoute = Router();

newsRoute.get("/:id", UsersController.getById);
newsRoute.post("/", UsersController.create);
newsRoute.patch("/:id", UsersController.update);

newsRoute.post("/auth", AuthController.authenticate);

export default newsRoute;
