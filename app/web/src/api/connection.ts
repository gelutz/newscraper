import axios from "axios";
import { UnauthorizedInterceptors } from "./interceptors/unauthorized";

const connection = axios.create({
    baseURL: "http://localhost:3333",
});

// axios.interceptors.response.use(...UnauthorizedInterceptors());

export default connection;
