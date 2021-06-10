import News from "models/News";

declare namespace Express {
    export interface Request {
        params: Partial<News>;
    }
}
