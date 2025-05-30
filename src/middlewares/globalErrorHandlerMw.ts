import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../interfaces/HttpCode';
import { DBError } from '../utils/DBError';
import { ApiError } from '../utils/ApiError';

const globalErrorHandlerMw = (
  err: Error,
  req: Request,
  res: Response,
  _nxt: NextFunction,
) => {
  const { logger } = req;
  let status = HttpCode.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  const stack = err.stack || '';

  // Log the exception to CloudWatch, Prometheus, or other monitoring software, for better investigation capability in production
  logger.info('Exception:', err);

  if (err instanceof DBError) {
    message = 'Encountered a database error.';
  } else if (err instanceof ApiError) {
    status = err.statusCode;
  }

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV !== 'prd' ? { stackTrace: stack } : {}), // include the stack trace in non-prod env
  });
};

export { globalErrorHandlerMw };
