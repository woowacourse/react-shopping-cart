import { ERROR } from '@Constants/index';

export const checkHttpStatusError = (status: number) => {
  if (400 <= status && status < 500) throw ERROR.httpClient;
  if (500 <= status && status < 600) throw ERROR.httpServer;
};
