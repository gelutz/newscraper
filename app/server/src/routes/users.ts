import { Router } from "express";
import { optionalAuth, requiredAuth } from "../middlewares/Auth";

import UsersController from "../controllers/UsersController";

const usersRoute = Router();

usersRoute.get("/:id", optionalAuth, UsersController.getById);
usersRoute.post("/", optionalAuth, UsersController.create);

usersRoute.patch("/:id", requiredAuth, UsersController.update);
usersRoute.delete("/:id", requiredAuth, UsersController.delete);
export default usersRoute;
