
import CustomError from "./customError.js";

export class BadRequestError extends CustomError {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode=400;
    }
}