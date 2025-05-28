import { RequestId } from '../utils/requestId';
export {};
declare global {
  namespace Express {
    interface Request {
      requestId: RequestId;
    }
  }
}
