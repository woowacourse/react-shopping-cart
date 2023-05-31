const FETCH_ERROR_MESSAGES: Record<number, string> = {
  403: "ERROR(403) - 인증 중 오류가 발생했어요. 로그인 정보를 확인 후 다시 시도해 주세요.",
  404: "ERROR(404) - 찾고자 하는 페이지가 없어요!",
  500: "ERROR(500) - 서버가 불안정해요, 잠시 후 다시 시도해 주세요!",
};

const DEFAULT_ERROR_MESSAGE =
  "알 수 없는 오류가 발생했습니다. 페이지를 새로고침 해 주세요.";

const getErrorMessageByCode = (errorCode?: number) => {
  if (!errorCode) {
    return DEFAULT_ERROR_MESSAGE;
  }

  return FETCH_ERROR_MESSAGES[errorCode] || DEFAULT_ERROR_MESSAGE;
};

export { FETCH_ERROR_MESSAGES, getErrorMessageByCode };
