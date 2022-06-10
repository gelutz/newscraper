import CustomError from "./CustomError";

export default class UnauthorizedError extends CustomError {
    readonly status: number;
    readonly message: string;
    readonly name: string;

    constructor() {
        super();
        this.message = "Não está autorizado.";
        this.name = "Unauthorized";
        this.status = 401;
    }
}
