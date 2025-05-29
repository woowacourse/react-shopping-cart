export const FETCH_ERROR_MESSAGE: Record<number, string> = {
  400: "요청에 문제가 있었어요. 입력 내용을 다시 한 번 확인해 주세요.",
  401: "로그인이 필요해요. 로그인 후 다시 시도해 주세요.",
  403: "접근 권한이 없어요. 권한을 확인해 주세요.",
  404: "찾으시는 페이지가 없어요. 경로를 다시 확인해 주세요.",
  500: "일시적인 서버 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
} as const;

export const DEFAULT_ERROR_MESSAGE = "저런! 예기치 못한 문제가 발생했어요!";
