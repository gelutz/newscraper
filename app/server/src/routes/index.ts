import { Application } from "express";

import AuthController from "../controllers/AuthController";

import newsRoute from "./news";
import usersRoute from "./users";

export default (app: Application) => {
    app.use("/news", newsRoute);
    app.use("/users", usersRoute);

    app.post("/login", AuthController.login);
    app.post("/refresh", AuthController.refreshTokens);
};
