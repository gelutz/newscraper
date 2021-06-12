import { Router } from "express";

import UsersController from "../../controllers/UsersController";

import AuthController from "../../controllers/AuthController";
const newsRoute = Router();

newsRoute.get("/:id", UsersController.getById);
newsRoute.patch("/:id", UsersController.update);

newsRoute.get("/auth", AuthController.authenticate);

export default newsRoute;
