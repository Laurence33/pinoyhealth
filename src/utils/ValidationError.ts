import { HttpCode } from '../interfaces/HttpCode';
import { ApiError } from './ApiError';

class ValidationError extends ApiError {
  constructor(message: string) {
    const ex = new Error(message);
    super(HttpCode.BAD_REQUEST, ex);
  }
}

export { ValidationError };
