export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, ex: Error) {
    super(ex.message);
    this.statusCode = statusCode;
  }
}
