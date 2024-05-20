import { NextFunction, Request, Response } from 'express';

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
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }

  let status = 500;

  if (error.name === 'not-found') status = 404;

  res.status(status).send({
    success: false,
    message: error.message || 'Something went wrong!',
    error: error,
  });
};
