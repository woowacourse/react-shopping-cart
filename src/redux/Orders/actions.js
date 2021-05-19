export const SET_ORDER_SUCCESS = 'orders/set_order/success';
export const SET_ORDER_ERROR = 'orders/set_order/error';

export const setOrder = (products) => {
  return {
    type: SET_ORDER_SUCCESS,
    products,
  };
};
