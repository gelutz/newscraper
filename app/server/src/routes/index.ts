import { Router } from "express";

import newsRoute from "./News";
import usersRoute from "./Users";
const routes = Router();

routes.use("/news", newsRoute);
routes.use("/users", usersRoute);

export default routes;
