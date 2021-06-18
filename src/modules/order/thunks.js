import { orderAPI } from '../../apis';
import {
  ADD_ORDER_FAILURE,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
} from './actions';

export const getOrdersThunk = () => async dispatch => {
  dispatch({ type: GET_ORDERS_LOADING });

  try {
    const data = await orderAPI.getOrders();
    const reversedData = [...data].reverse();

    dispatch({ type: GET_ORDERS_SUCCESS, payload: reversedData });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_ORDERS_FAILURE, payload: err });
  }
};

export const addOrderThunk = items => async (dispatch, getState) => {
  dispatch({ type: ADD_ORDER_LOADING });

  try {
    const requestData = items.map(({ cartId, quantity }) => ({ cartId, quantity }));

    const data = getState().order.orders.data;
    const orderId = await orderAPI.addOrder(requestData);
    const order = {
      orderId,
      orderDetails: items.map(({ productId, price, name, imageUrl, quantity }) => ({
        productId,
        price,
        name,
        imageUrl,
        quantity,
      })),
    };

    dispatch({ type: ADD_ORDER_SUCCESS, payload: [...data, order] });
  } catch (err) {
    console.error(err);
    dispatch({ type: ADD_ORDER_FAILURE, payload: err });
  }
};
