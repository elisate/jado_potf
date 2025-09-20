import { z, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.js';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = {};

        error.errors.forEach((err) => {
          const path = err.path.length > 1 ? err.path.slice(1).join('.') : err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });

        next(new ValidationError(errors));
      } else {
        next(error);
      }
    }
  };
};

// Function that will help us validate our data
export const validateData = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = {};

      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      throw new ValidationError(errors);
    }
    throw error;
  }
};
