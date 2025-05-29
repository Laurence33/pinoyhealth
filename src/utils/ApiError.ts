export class ApiError extends Error {
  statusCode: number;
  trace: string;
  constructor(statusCode: number, message: string, trace: string) {
    super(message);
    this.statusCode = statusCode;
    this.trace = trace;
  }
}
