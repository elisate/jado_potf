export class AppError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(errors, message = 'Validation failed') {
    super(message, 400, true);
    this.errors = errors;
  }
}
