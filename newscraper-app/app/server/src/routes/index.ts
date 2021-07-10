import AuthController from "../controllers/AuthController";
import { Router } from "express";
import authMiddleware from "../middlewares/AuthMiddleware";

import newsRoute from "./News";
import usersRoute from "./Users";
const routes = Router();

routes.use("/news", newsRoute);
routes.use("/users", [authMiddleware], usersRoute);

routes.post("/auth", AuthController.authenticate);

export default routes;
