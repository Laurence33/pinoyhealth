import { RequestId } from '../utils/requestId';
declare global {
  namespace Express {
    interface Request {
      requestId: RequestId;
    }
  }
}
