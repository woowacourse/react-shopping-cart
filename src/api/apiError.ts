import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../constants/api';
import HTTPError from './HTTPError';

const handleAPIError = (responseStatus: number, message?: string) => {
  if (responseStatus >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR],
    });
  }

  if (responseStatus === HTTP_STATUS_CODE.NOT_FOUND) {
    throw new HTTPError(HTTP_STATUS_CODE.NOT_FOUND, {
      message,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
    });
  }

  if (responseStatus >= HTTP_STATUS_CODE.BAD_REQUEST) {
    throw new HTTPError(HTTP_STATUS_CODE.BAD_REQUEST, {
      message,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST],
    });
  }
};

export { handleAPIError };
