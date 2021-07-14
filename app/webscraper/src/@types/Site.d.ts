import { New } from "./News";

export type Site = {
    name: string;
    baseURL: string;
    search(): Promise<New[]>;
};
