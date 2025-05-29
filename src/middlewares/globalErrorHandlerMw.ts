import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../interfaces/HttpCode';
import { ApiError } from '../utils/ApiError';

const globalErrorHandlerMw = (
  err: ApiError,
  req: Request,
  res: Response,
  _nxt: NextFunction,
) => {
  const { logger } = req;
  const status = err.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  const trace = err.trace || '';

  // Log the exception to CloudWatch, Prometheus, or other monitoring software, for better investigation capability in production
  logger.info('Exception:', err);

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV !== 'prd' ? { stackTrace: trace } : {}), // include the stack trace in non-prod env
  });
};

export { globalErrorHandlerMw };
