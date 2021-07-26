import { Router } from "express";

import AuthController from "../controllers/AuthController";

import newsRoute from "./News";
import usersRoute from "./Users";

const routes = Router();

routes.post("/auth", AuthController.authenticate);

routes.use("/news", newsRoute);
routes.use("/users", usersRoute);

export default routes;
