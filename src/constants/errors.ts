export type ERROR_MESSAGE = `[ERROR] ${string}.`;
export type ERROR_MESSAGE_FN = (payload: {
  [key: string]: unknown;
}) => ERROR_MESSAGE;
export type ERROR_MESSAGE_FORMAT = ERROR_MESSAGE | ERROR_MESSAGE_FN;

const STATUS_400: ERROR_MESSAGE = `[ERROR] 잘못된 요청입니다.`;
const STATUS_401: ERROR_MESSAGE = `[ERROR] 인증되지 않은 요청입니다.`;
const STATUS_403: ERROR_MESSAGE = `[ERROR] 접근이 거부되었습니다.`;
const STATUS_404: ERROR_MESSAGE = `[ERROR] 요청한 리소스를 찾을 수 없습니다.`;
const STATUS_500: ERROR_MESSAGE = `[ERROR] 서버 내부 오류가 발생했습니다.`;
const UNEXPECTED_ERROR: ERROR_MESSAGE = `[ERROR] 알 수 없는 오류가 발생했습니다.`;
const WRONG_METHOD: ERROR_MESSAGE = `[ERROR] 잘못된 메서드 형식입니다.`;
const WRONG_URL_FORMAT: ERROR_MESSAGE_FN = ({ path, base }) =>
  `[ERROR] <path: ${path}, base: ${base}> 잘못된 경로 형식입니다.`;

export const STATUS_CODE = {
  STATUS_400: 400,
  STATUS_401: 401,
  STATUS_403: 403,
  STATUS_404: 404,
  STATUS_500: 500,
} as const;

export const ERROR_CODE = {
  STATUS_400: 'STATUS_400',
  STATUS_401: 'STATUS_401',
  STATUS_403: 'STATUS_403',
  STATUS_404: 'STATUS_404',
  STATUS_500: 'STATUS_500',
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  WRONG_URL_FORMAT: 'WRONG_URL_FORMAT',
  WRONG_METHOD: 'WRONG_METHOD',
} as const;

export const ERROR_MESSAGE = {
  STATUS_400,
  STATUS_401,
  STATUS_403,
  STATUS_404,
  STATUS_500,
  UNEXPECTED_ERROR,
  WRONG_METHOD,
  WRONG_URL_FORMAT,
} as const;

export type StatusCode = typeof STATUS_CODE;
export type ErrorCode = typeof ERROR_CODE;
export type ErrorMessage = typeof ERROR_MESSAGE;
