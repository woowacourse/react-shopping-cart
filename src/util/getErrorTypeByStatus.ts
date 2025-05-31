import { ErrorType } from "../constants/ApiError";

export function getErrorTypeByStatus(status: number): ErrorType {
  if (status >= 400 && status < 500) {
    if (status === 401 || status === 403) return ErrorType.UNAUTHORIZED;
    if (status === 404) return ErrorType.NOT_FOUND;
    if (status === 422) return ErrorType.VALIDATION;
    return ErrorType.API;
  }
  if (status >= 500) return ErrorType.SERVER;
  return ErrorType.UNKNOWN;
}
