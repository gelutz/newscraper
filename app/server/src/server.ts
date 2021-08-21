import "express-async-errors";

import * as postgresClient from "./database/connections/postgres";
import * as redisClient from "./database/connections/redis";

import Routes from "./routes";

import { errorHandler } from "./middlewares/Error";
import { xPowered } from "./middlewares/xPowered";

import { app } from "./app";

app.use(xPowered);

Routes(app);

app.use(errorHandler);

redisClient.start();

postgresClient.start().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});
