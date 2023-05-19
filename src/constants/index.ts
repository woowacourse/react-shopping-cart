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

import outOfStock from '@Asset/outOfStock.png';
import warning from '@Asset/warning.png';

import { Error } from '@Types/index';

export const ERROR: { [key: string]: Error } = {
  httpClient: {
    message: `잘못된 요청입니다.\n다시 확인해주세요.\n(error: 400번)`,
    imgSrc: warning,
    imgAlt: '경고 이미지',
  },
  httpServer: {
    message: `지금은 접근할 수 없습니다.\n잠시후 다시 시도해주세요.\n(error: 500번)`,
    imgSrc: warning,
    imgAlt: '경고 이미지',
  },
  dataEmpty: {
    message: `판매 상품이 없습니다.\n자세한 사항은 담당자에게 문의해주세요.\n(tel. XX-XXXX-XXXX)`,
    imgSrc: outOfStock,
    imgAlt: '빈 상자 이미지',
  },
  httpUnknown: {
    message: `알 수 없는 오류입니다.\n자세한 사항은 담당자에게 문의해주세요.\n(tel. XX-XXXX-XXXX)`,
    imgSrc: warning,
    imgAlt: '경고 이미지',
  },
} as const;
