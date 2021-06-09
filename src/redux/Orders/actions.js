import { API_URL } from '../../constants/api';
import { ERROR_MESSAGE } from '../../constants/message';

export const GET_ORDERS_PENDING = 'orders/get_order/pending';
export const GET_ORDERS_SUCCESS = 'orders/get_order/success';
export const GET_ORDERS_ERROR = 'orders/get_order/error';

export const SET_ORDER_PENDING = 'orders/set_order/pending';
export const SET_ORDER_SUCCESS = 'orders/set_order/success';
export const SET_ORDER_ERROR = 'orders/set_order/error';

export const RESET_ORDERS = 'orders/reset_orders';

export const getOrders = () => (dispatch, getState) => {
  dispatch({ type: GET_ORDERS_PENDING });
  fetch(API_URL.ORDERS)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_GET_ORDERS);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: GET_ORDERS_SUCCESS,
        order: data,
      });
    })
    .catch((e) =>
      dispatch({
        type: GET_ORDERS_ERROR,
        errorMessage: e.message,
      })
    );
};

export const setOrder = (order) => (dispatch, getState) => {
  dispatch({ type: SET_ORDER_PENDING });
  fetch(API_URL.ORDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_SET_ORDER);
      }

      dispatch({
        type: SET_ORDER_SUCCESS,
      });
    })
    .catch((e) =>
      dispatch({
        type: SET_ORDER_ERROR,
        errorMessage: e.message,
      })
    );
};

export const resetOrders = () => {
  return {
    type: RESET_ORDERS,
  };
};
