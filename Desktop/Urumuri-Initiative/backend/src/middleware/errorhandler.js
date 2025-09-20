import { ValidationError } from '../utils/errors.js'; 

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    status: statusCode,
    message: err.message || 'Internal Server Error',
  };

  // Include validation errors from Zod
  if (err instanceof ValidationError) {
    response.errors = err.errors;
  }

  // Show stack only in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
