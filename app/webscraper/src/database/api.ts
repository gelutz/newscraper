import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// host "server" é o nome do container do backend no docker-compose
const api = axios.create({
    baseURL: `server:${process.env.SERVER_PORT}`,
});
export { api };
