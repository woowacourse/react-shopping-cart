import axios from 'axios';
import { ACTION_TYPE } from '../constants';

export const postOrders = async (orderItems, dispatch) => {
  try {
    await axios.post('/api/customers/ddongule/orders', orderItems);

    dispatch({ type: ACTION_TYPE.PRODUCTS.RESET_CARTS });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCompletedOrder = () => async dispatch => {
  try {
    const response = await axios.get('/api/customers/ddongule/orders');

    dispatch({
      type: ACTION_TYPE.ORDERS.SET_COMPLETED_ORDERS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
};
