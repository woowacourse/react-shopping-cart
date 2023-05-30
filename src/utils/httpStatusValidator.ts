const HTTP_SUCCESS_STATUS = [200, 201, 204, 301, 304];
const HTTP_FAILURE_STATUS = [400, 401, 403, 404, 409, 413, 500];

export const isSuccessHttpStatus = (status: number) => {
  return HTTP_SUCCESS_STATUS.includes(status);
};

export const isFailureHttpStatus = (status: number) => {
  return HTTP_FAILURE_STATUS.includes(status);
};
