import { ApiError, ERROR_MESSAGES, ErrorType } from "../constants/ApiError";

export function createApiError(error: unknown): ApiError {
  if (error instanceof Error && error.name === "AbortError") {
    return new ApiError(
      499,
      "Request Cancelled",
      ERROR_MESSAGES["Request Cancelled"],
      ErrorType.ABORT
    );
  }

  if (error instanceof Error && error.name === "TypeError") {
    return new ApiError(
      0,
      "Network Error",
      ERROR_MESSAGES["Network Error"],
      ErrorType.NETWORK
    );
  }

  if (error instanceof ApiError) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  return new ApiError(
    500,
    "Unknown Error",
    message || "알 수 없는 오류가 발생했습니다.",
    ErrorType.UNKNOWN
  );
}
