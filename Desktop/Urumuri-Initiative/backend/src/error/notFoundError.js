import CustomError from "./customError.js";
export class NotFoundError extends CustomError {
      statusCode;
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}