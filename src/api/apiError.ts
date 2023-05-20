import { HTTP_STATUS_CODE } from '../constants/api';
import HTTPError from './HTTPError';

const handleAPIError = (responseStatus: number, errorMessage?: string) => {
  if (responseStatus >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, errorMessage);
  }

  if (responseStatus === HTTP_STATUS_CODE.NOT_FOUND) {
    throw new HTTPError(HTTP_STATUS_CODE.NOT_FOUND, errorMessage);
  }

  if (responseStatus >= HTTP_STATUS_CODE.BAD_REQUEST) {
    throw new HTTPError(HTTP_STATUS_CODE.BAD_REQUEST, errorMessage);
  }
};

export { handleAPIError };
