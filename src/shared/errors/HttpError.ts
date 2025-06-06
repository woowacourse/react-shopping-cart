export class HttpError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data?: unknown) {
    super(`HTTP Error ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}
