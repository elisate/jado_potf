class UnauthorizedError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

class ForbiddenError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

export { UnauthorizedError, ForbiddenError };
