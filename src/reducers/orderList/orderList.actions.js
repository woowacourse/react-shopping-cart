export const actionTypes = {
  GET_ORDER_LIST: 'GET_ORDER_LIST',
  GET_ORDER_LIST_SUCCESS: 'GET_ORDER_LIST_SUCCESS',
  GET_ORDER_LIST_ERROR: 'GET_ORDER_LIST_ERROR',
};

export const getOrderList = () => ({
  type: actionTypes.GET_ORDER_LIST,
});

export const getOrderListSuccess = (data) => ({
  type: actionTypes.GET_ORDER_LIST_SUCCESS,
  data,
});

export const getOrderListError = () => ({
  type: actionTypes.GET_ORDER_LIST_ERROR,
});
