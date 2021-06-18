export class HTTPError extends Error {
  public statusCode = 0;

  constructor(statusCode: number, message: string) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}

export class FetchError extends HTTPError {
  public functionName = '';

  constructor(functionName: string, { statusCode, message }: HTTPError) {
    super(statusCode, message);

    this.functionName = functionName;
  }
}
