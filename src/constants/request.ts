// const BASE_URL = "https://yungo1846-shopping-cart.herokuapp.com/";
const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';

const USER_ID = 'yungo1846';

export const URL = {
  PRODUCTS: `${BASE_URL}/products`,
  CART: `${BASE_URL}/customers/${USER_ID}/carts`,
  ORDERS: `${BASE_URL}/orders`,
};

export const RESPONSE_RESULT = {
  SUCCESS: 'SUCCESS',
  ALREADY_EXIST: 'ALREADY_EXIST',
  FAILURE: 'FAILURE',
};

export const STATUS_CODE = {
  GET_SUCCESS: 200,
  PUT_SUCCESS: 200,
  DELETE_SUCCESS: 204,
  POST_SUCCESS: 201,
  [RESPONSE_RESULT.ALREADY_EXIST]: 500,
};
