/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
import { Request } from 'express';

class Logger {
  private requestId: string;
  private method: string;
  private path: string;

  constructor(req: Request) {
    this.requestId = req.requestId.get();
    this.method = req.method;
    this.path = req.path;
  }

  log(prefix: string, ...args: any) {
    console.log(
      `[${this.requestId}] [${new Date().toISOString()}] [${this.method} ${this.path}] [${prefix}]`,
      ...args,
    );
  }

  info(...args: any) {
    this.log('INFO', ...args);
  }

  static log(prefix: string, ...args: any) {
    console.log(`[${new Date().toISOString()}] [${prefix}]`, ...args);
  }

  static info(...args: any) {
    Logger.log('INFO', ...args);
  }

  static error(...args: any) {
    Logger.log('ERROR', ...args);
  }
}

export { Logger };
