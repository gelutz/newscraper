import CustomError from "./CustomError";

export default class NotFoundError extends CustomError {
    readonly status: number;
    readonly message: string;
    readonly name: string;

    constructor(entidade) {
        super();
        this.message = `${entidade} não foi encontrato`;
        this.name = "Not Found";
        this.status = 404;
    }
}
