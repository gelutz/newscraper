import { Router } from "express";

import UsersController from "../../controllers/UsersController";

const usersRoute = Router();

usersRoute.get("/:id", UsersController.getById);
usersRoute.post("/", UsersController.create);
usersRoute.patch("/:id", UsersController.update);

export default usersRoute;
