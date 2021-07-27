import { Router } from "express";
import authMiddleware from "../../middlewares/AuthMiddleware";

import UsersController from "../../controllers/UsersController";

const usersRoute = Router();

usersRoute.get("/:id", UsersController.getById);
usersRoute.post("/", UsersController.create);
usersRoute.patch("/:id", authMiddleware, UsersController.update);
usersRoute.delete("/:id", authMiddleware, UsersController.delete);
export default usersRoute;
