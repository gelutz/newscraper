import { config } from "dotenv";
config();

export const JWT_KEY = process.env.JWT_KEY as string;

export const SERVER_PORT = +process.env.SERVER_PORT!;
export const REDIS_PORT = +process.env.REDIS_PORT!;

export const DB_PORT = +process.env.DB_PORT!;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_PASSWORD = process.env.DB_PASSWORD as string;
export const DB_DATABASE = process.env.DB_DATABASE as string;
