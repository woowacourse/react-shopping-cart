import { ERROR_MESSAGE } from '@Constants/index';

export const isHttpStatusError = (status: number) => {
  if (400 <= status && status < 500) throw new Error(ERROR_MESSAGE.CLIENT);
  if (500 <= status && status < 600) throw new Error(ERROR_MESSAGE.SERVER);
};
