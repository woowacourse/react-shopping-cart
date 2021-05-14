const BASE_URL = 'https://yungo1846-shopping-cart.herokuapp.com/api';

export const URL = {
  PRODUCTS: `${BASE_URL}/products`,
  CART: `${BASE_URL}/cart`,
  ORDERS: `${BASE_URL}/orders`,
};

export const STATUS_CODE = {
  GET_SUCCESS: 200,
  PUT_SUCCESS: 200,
  DELETE_SUCCESS: 200,
  POST_SUCCESS: 201,
  ALREADY_EXIST: 500,
};

export const RESPONSE_RESULT = {
  SUCCESS: 'SUCCESS',
  ALREADY_EXIST: 'ALREADY_EXIST',
  FAILURE: 'FAILURE',
};
