import axios from "axios";
import { responseHandler, errorHandler } from "./interceptors/unauthorized";

const connection = axios.create({
    baseURL: "http://localhost:3333",
});

axios.interceptors.response.use(responseHandler, errorHandler);
console.log("🚀 ~ file: connection.ts ~ line 9 ~ axios");

export default connection;
