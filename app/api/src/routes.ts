import { Router } from "express"

import NewsController from "./controllers/NewsController"
const routes = Router()

routes.get("/", NewsController.index)
routes.post("/", NewsController.store)

export default routes
