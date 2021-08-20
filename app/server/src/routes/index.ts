import { Router } from "express";

import AuthController from "../controllers/AuthController";

import newsRoute from "./news";
import usersRoute from "./users";

const routes = Router();

routes.post("/login", AuthController.login);

routes.use("/news", newsRoute);
routes.use("/users", usersRoute);

export default routes;
