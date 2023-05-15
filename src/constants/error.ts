import { ErrorCodeType } from "../type/error";

export const ERROR = {
  INVALID_ACTION: "잘못된 action 이 전달되었습니다.",
};

export const ERROR_CODE: ErrorCodeType = {
  "400": "Bad Request: 해당 검색을 진행할 수 없습니다.",
  "401": "Unauthorized: 인증에 실패했습니다",
  "403": "Forbidden: 해당 페이지에 접근할 수 없습니다.",
  "404": "Not Found: 해당 경로를 찾을 수 없습니다.",
  "405": "Method Not Allowed: 관리자에게 문의해주세요.",
  "500": "Internal Server Error: 서버에서 요청처리 중 에러가 발생했습니다.",
  "501": "Service Unavailable: 서버가 일시적으로 요청을 처리할 수 없습니다.",
};
