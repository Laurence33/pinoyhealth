import { randomUUID } from 'node:crypto';

class RequestId {
  private requestId: string = '';

  generate() {
    this.requestId = randomUUID();
  }

  get() {
    return this.requestId;
  }
}

export { RequestId };
