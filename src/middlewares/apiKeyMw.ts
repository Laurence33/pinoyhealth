import { NextFunction, Request, Response } from 'express';
import config from '../config/config';

const apiKeyMw = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const apiHeader = req.headers['x-api-key'];
  if (!apiHeader) {
    return res.status(403).json({
      statusCode: 403,
      message: 'API key is required.',
    });
  }

  if (apiHeader !== config.apiKey) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid API key',
    });
  }

  next();
};

export default apiKeyMw;
