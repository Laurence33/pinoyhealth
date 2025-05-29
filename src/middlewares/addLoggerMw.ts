import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

const addLoggerMw = (req: Request, _res: Response, nxt: NextFunction) => {
  req.logger = new Logger(req);
  nxt();
};

export { addLoggerMw };
