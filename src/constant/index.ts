import { ROUTE } from './route';
import { SCHEMA } from './schema';
import { CONFIRM_MESSAGE, FAIL_MESSAGE } from './message';
import { ORDER_QUERY, CART_QUERY, PRODUCT_QUERY } from './api';

const MIN_PAGE_INDEX = 0;

const AMOUNT_COUNT = {
  MIN: 1,
  MAX: 20,
};

const AMOUNT_COUNTER_FLAG = {
  UP: 'up',
  DOWN: 'down',
};

const CONTENT_PER_PAGE = 11;

const CUSTOMER_ID = 0;

export {
  ROUTE,
  AMOUNT_COUNT,
  CONTENT_PER_PAGE,
  MIN_PAGE_INDEX,
  SCHEMA,
  CONFIRM_MESSAGE,
  AMOUNT_COUNTER_FLAG,
  CUSTOMER_ID,
  ORDER_QUERY,
  CART_QUERY,
  PRODUCT_QUERY,
  FAIL_MESSAGE,
};
