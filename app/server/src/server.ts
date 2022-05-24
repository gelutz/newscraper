import "express-async-errors";
import * as postgresClient from "./database/connections/postgres";
import * as redisClient from "./database/connections/redis";

import Routes from "./routes";

import { app } from "./app";
import { errorHandler } from "./middlewares/Error";

Routes(app);
errorHandler(app);

// try {
//     redisClient.start();
// } catch (e) {
//     console.log(e);
// }

postgresClient.start().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server running at port ${port}`));
});
