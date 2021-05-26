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

export const handleIncreaseQuantity = (products, id) => async dispatch => {
  // const product = products.find(product => product.product_id === id);
  // const newQuantity = product.quantity + 1;
  // console.log(product, product.cart_id);
  // axios.post(`/api/customers/ddongule/orders`, [
  //   {
  //     cart_id: product.cart_id,
  //     quantity: newQuantity,
  //   },
  // ]);

  dispatch({ type: ACTION_TYPE.PRODUCTS.INCREASE_QUANTITY, id });
};

export const handleDecreaseQuantity = (products, id) => async dispatch => {
  // const product = products.find(product => product.product_id === id);
  // const newQuantity = product.quantity - 1;

  // axios.post(`/api/customers/ddongule/orders`, [
  //   {
  //     cart_id: product.cart_id,
  //     quantity: newQuantity,
  //   },
  // ]);

  dispatch({ type: ACTION_TYPE.PRODUCTS.DECREASE_QUANTITY, id });
};
