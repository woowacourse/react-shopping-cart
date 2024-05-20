export const HTTP_ERROR_MESSAGE = {
  404: {
    body: '잠시 후 다시 요청해주세요.',
    button: '뒤로 가기',
  },
  500: {
    heading: '서버 오류가 발생했습니다',
    body: '잠시 후 다시 요청해주세요.',
    button: '다시 시도하기',
  },
} as const;
