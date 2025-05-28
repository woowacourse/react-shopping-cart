export enum ErrorType {
  NETWORK = "NETWORK",
  ABORT = "ABORT",
  API = "API",
  VALIDATION = "VALIDATION",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
  CLIENT = "CLIENT",
  PARSE = "PARSE",
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  type: ErrorType;

  constructor(
    status: number,
    statusText: string,
    message: string,
    type: ErrorType
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.type = type;
  }
}

export const ERROR_MESSAGES: Record<string, string> = {
  // API 에러 메시지
  "Product Not Found": "상품을 찾을 수 없습니다.",
  "Sold Out": "품절된 상품입니다.",
  "Cart Item Not Found": "장바구니 항목을 찾을 수 없습니다.",
  "Insufficient Stock": "재고가 부족합니다.",
  "Invalid Quantity": "수량은 0보다 커야 합니다.",
  "Unhandled Request": "처리할 수 없는 요청입니다.",
  "Invalid Data": "유효하지 않은 데이터입니다.",
  "Unprocessable Entity": "처리할 수 없는 엔티티입니다.",

  "Cart Fetching Error": "장바구니 정보를 가져오는 중 오류가 발생했습니다.",
  "Product Fetching Error": "제품 정보를 가져오는 중 오류가 발생했습니다.",
  "Network Error": "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요.",
  "Request Cancelled": "요청이 취소되었습니다.",

  // HTTP 상태 코드 기반 에러 메시지
  "400": "잘못된 요청입니다.",
  "422": "유효하지 않은 데이터입니다.",
  "401": "인증이 필요합니다.",
  "403": "접근 권한이 없습니다.",
  "404": "요청한 리소스를 찾을 수 없습니다.",
  "500": "서버 오류가 발생했습니다.",
  "502": "게이트웨이 오류가 발생했습니다.",
  "503": "서비스를 일시적으로 사용할 수 없습니다.",
};
