const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const ENDPOINT = `${BASE_URL}/api`;

export const URL = {
  PRODUCTS: `${ENDPOINT}/products`,
  CART: `${ENDPOINT}/customers/swon3210/carts`,
  ORDERS: `${ENDPOINT}/customers/swon3210/orders`,
};

export const STATUS_CODE = {
  GET_SUCCESS: 200,
  DELETE_SUCCESS: 204,
  POST_SUCCESS: 201,
  POST_FAILURE: 500,
};
