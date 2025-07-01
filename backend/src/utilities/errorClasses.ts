export class HttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message);
    }
}
export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(401, message);
    }
}
export class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(401, message);
    }
}
export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(403, message);
    }
}
export class ConflictError extends HttpError {
    constructor(message: string) {
        super(409, message);
    }
}
