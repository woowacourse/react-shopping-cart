const CUSTOMER_NAME = 'jum0';

export const API_END_POINT = 'https://shopping-cart.techcourse.co.kr/api';

export const API_PATH = {
  PRODUCT_LIST: '/products',
  SHOPPING_CART_LIST: `/customers/${CUSTOMER_NAME}/carts`,
  ORDER_ITEM_LIST: `/customers/${CUSTOMER_NAME}/orders`,
};

export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const RETURN_TYPE = {
  JSON: 'json',
};
