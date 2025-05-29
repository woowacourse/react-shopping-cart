export const API_ERROR_MESSAGES: Record<number, string> = {
  400: "재고 수량을 초과하여 담을 수 없습니다.",
  401: "서비스에 접속할 수 없습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.",
  403: "접근 권한이 없습니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
} as const;

export const DEFAULT_ERROR_MESSAGE = "알수없는 오류가 발생했습니다.";
export const API_URL_ERROR_MESSAGE = "API_URL이 정의되지 않았습니다.";
