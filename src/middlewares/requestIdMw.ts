import { NextFunction, Request, Response } from 'express';
import { RequestId } from '../utils/requestId';

const requestIdMw = (req: Request, _res: Response, nxt: NextFunction) => {
  const requestId = new RequestId();
  requestId.generate();
  req.requestId = requestId;
  nxt();
};

export { requestIdMw };
