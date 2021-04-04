import express from "express"
import { createConnection } from "typeorm"
import config from "./ormconfig"

// connects to database
const app = express()

createConnection(config)
	.then(() => console.log("Connected to database."))
	.catch(error => console.log(error))

app.listen(3333, () => console.log("server running at 3333 or smt"))
