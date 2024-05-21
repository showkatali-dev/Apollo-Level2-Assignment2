import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error();
  error.name = 'not-found';
  error.message = 'Route not found!';
  next(error);
};

export const globalErrorHandler = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return res.status(403).send({
      success: false,
      message: error.issues[0].message,
      error: error.issues,
    });
  }

  let status = 500;

  if (error.name === 'not-found') status = 404;

  res.status(status).send({
    success: false,
    message: error.message || 'Something went wrong!',
    error: error,
  });
};
