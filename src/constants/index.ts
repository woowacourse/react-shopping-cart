export const ALERT_MESSAGE = {
  OVER_MAX_QUANTITY: '한 계정당 한 품목을 99개 이하로 구입가능합니다.',
} as const;

export const SHOPPING_QUANTITY = {
  DEFAULT: 1,
  MAX: 99,
  MIN: 0,
} as const;

export const QUANTITY_CONTROL_BUTTON = {
  PLUS: 'plus',
  MINUS: 'minus',
} as const;

export const QUANTITY_CONTROL_UNIT = {
  INCREASE: 1,
  DECREASE: 1,
} as const;

export const MOCK_DATA_URL = '/api/mockData';

export const ERROR_MESSAGE = {
  CLIENT: `잘못된 요청입니다.\n다시 확인해주세요.\n(error: 400번)`,
  SERVER: `지금은 접근할 수 없습니다.\n잠시후 다시 시도해주세요.\n(error: 500번)`,
};
