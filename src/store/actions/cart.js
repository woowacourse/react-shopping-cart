import { addToCart, getCart } from '../../api/api';
import { actionFailed, actionStarted, actionSucceeded } from './global';

export const addToCartAsync = (productId, quantity) => async (dispatch) => {
  const stateName = 'CART_ADD';
  dispatch(actionStarted(stateName));
  try {
    const cart = await addToCart(productId, quantity);
    dispatch(actionSucceeded(stateName, { cart }));
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};

export const fetchCartAsync = () => async (dispatch) => {
  const stateName = 'CART_FETCH';
  dispatch(actionStarted(stateName));
  try {
    const cart = await getCart();
    dispatch(actionSucceeded(stateName, { cart }));
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};
