export default class CustomError extends Error {
    readonly status: number;
    readonly message: string;
    readonly name: string;
}
