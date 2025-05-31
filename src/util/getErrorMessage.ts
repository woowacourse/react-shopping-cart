import { ERROR_MESSAGES } from "../constants/ApiError";

export function getErrorMessage(statusText: string, status?: number): string {
  if (ERROR_MESSAGES[statusText]) {
    return ERROR_MESSAGES[statusText];
  }

  if (status && ERROR_MESSAGES[status.toString()]) {
    return ERROR_MESSAGES[status.toString()];
  }

  return ERROR_MESSAGES["Network Error"];
}
