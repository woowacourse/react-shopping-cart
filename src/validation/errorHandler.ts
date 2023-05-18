import { ErrorCode, ERROR_CODE } from './../constants/errors';
import { STATUS_CODE } from '../constants/errors';
import { CustomError } from './errors';

const { STATUS_400, STATUS_401, STATUS_403, STATUS_404, STATUS_500 } =
  STATUS_CODE;

export const handleStatusCode = (status: number): never => {
  const code = getErrorCodeByStatus(status);

  throw new CustomError({ code });
};

const getErrorCodeByStatus = (status: number): keyof ErrorCode => {
  switch (status) {
    case STATUS_400:
      return ERROR_CODE.STATUS_400;
    case STATUS_401:
      return ERROR_CODE.STATUS_401;
    case STATUS_403:
      return ERROR_CODE.STATUS_403;
    case STATUS_404:
      return ERROR_CODE.STATUS_404;
    case STATUS_500:
      return ERROR_CODE.STATUS_500;
    default:
      return ERROR_CODE.UNEXPECTED_ERROR;
  }
};

export const getValidURL = (path: string | URL, base?: string | URL) => {
  try {
    return new URL(path, base);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new CustomError(
        { code: ERROR_CODE.WRONG_URL_FORMAT, payload: { path, base } },
        { value: { path, base } }
      );
    }

    throw new CustomError({ code: ERROR_CODE.UNEXPECTED_ERROR });
  }
};
