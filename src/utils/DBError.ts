class DBError extends Error {
  trace: string;
  constructor(error: any) {
    super(error.message);
    this.trace = error.stack;
  }
}

export { DBError };
