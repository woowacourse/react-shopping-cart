import axios from 'axios';
import { ACTION_TYPE } from '../constants';

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

export const deleteCartItem = (id, cartItems, dispatch) => async () => {
  if (id) {
    try {
      const cartItem = cartItems.find(item => item.product_id === id);
      const index = cartItems.findIndex(item => item.product_id === id);

      await axios.delete(`/api/customers/ddongule/carts/${cartItem.cart_id}`);

      dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE, index });
    } catch (error) {
      console.error(error);
    }

    return;
  }

  const deleteProducts = cartItems.filter(item => item.isChecked);
  deleteProducts.forEach(product => {
    try {
      axios.delete(`/api/customers/ddongule/carts/${product.cart_id}`);
    } catch (error) {
      console.error(error);
    }
  });

  dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE_CHECKED });
};
