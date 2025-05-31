import { ApiError, ERROR_MESSAGES, ErrorType } from "../constants/ApiError";
/**
 * @param {unknown} error
 *
 * @returns {ApiError}
 * @description
 * 이 함수는 API 호출에서 발생할 수 있는 다양한 오류를 ApiError로 변환합니다.
 * - AbortError: 요청이 취소된 경우, 499 상태 코드와 함께 ApiError를 반환합니다.
 * - TypeError: 네트워크 오류가 발생한 경우, 0 상태 코드와 함께 ApiError를 반환합니다.
 * - ApiError: 이미 ApiError 인스턴스인 경우 그대로 반환합니다.
 * - 기타 오류: 알 수 없는 오류가 발생한 경우, 500 상태 코드와 함께 ApiError를 반환합니다.
 */
export function toApiError(error: unknown): ApiError {
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
