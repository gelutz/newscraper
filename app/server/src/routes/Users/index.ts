import { Router } from "express";
import { isAuthenticated } from "../../middlewares/Authentication";

import UsersController from "../../controllers/UsersController";

const usersRoute = Router();

usersRoute.get("/:id", UsersController.getById);
usersRoute.post("/", UsersController.create);
usersRoute.patch("/:id", isAuthenticated, UsersController.update);
usersRoute.delete("/:id", isAuthenticated, UsersController.delete);
export default usersRoute;
