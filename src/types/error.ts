export interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}
