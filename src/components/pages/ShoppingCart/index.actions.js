import axios from 'axios';
import { ACTION_TYPE } from '../../../constants';

export const fetchCarts = () => async dispatch => {
  try {
    const response = await axios.get('/api/customers/ddongule/carts');
    dispatch({
      type: ACTION_TYPE.PRODUCTS.SET_CARTS,
      cartItems: response.data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const handleIncreaseQuantity = id => async dispatch => {
  dispatch({ type: ACTION_TYPE.PRODUCTS.INCREASE_QUANTITY, id });
};

export const handleDecreaseQuantity = id => async dispatch => {
  dispatch({ type: ACTION_TYPE.PRODUCTS.DECREASE_QUANTITY, id });
};
