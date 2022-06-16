import CustomError from './CustomError';

export default class TokenExpiredError extends CustomError {
    readonly status: number;
    readonly message: string;
    readonly name: string;

    constructor(type: 'access' | 'opaque') {
        super();
        this.message = `O token ${type} está expirado.`;
        this.name = 'TokenExpired';
        this.status = 401;
    }
}
