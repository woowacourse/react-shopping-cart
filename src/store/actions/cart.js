import { addToCart, deleteCartProduct, getCart, updateCartQuantity } from '../../api/api';
import { actionFailed, actionStarted, actionSucceeded } from './global';

export const addToCartAsync = (productId, quantity) => async (dispatch) => {
  const stateName = 'CART_ADD';
  dispatch(actionStarted(stateName));
  try {
    const { cart } = await addToCart(productId, quantity);
    dispatch(actionSucceeded(stateName, { cart }));
    dispatch({ type: 'UPDATE_CHECKED_LIST', payload: { checkedProductList: Object.keys(cart) } });
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};

export const fetchCartAsync = () => async (dispatch) => {
  const stateName = 'CART_FETCH';
  dispatch(actionStarted(stateName));
  try {
    const { cart } = await getCart();
    dispatch(actionSucceeded(stateName, { cart }));
    dispatch({
      type: 'UPDATE_CHECKED_LIST',
      payload: { checkedProductList: Object.keys(cart) },
    });
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};

export const updateCartProductQuantityAsync = (productId, quantity) => async (dispatch) => {
  const stateName = 'CART_UPDATE';
  dispatch(actionStarted(stateName));

  try {
    const { cart } = await updateCartQuantity(productId, quantity);
    dispatch(actionSucceeded(stateName, { cart }));
    dispatch({
      type: 'UPDATE_CHECKED_LIST',
      payload: { checkedProductList: Object.keys(cart) },
    });
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};

export const toggleProductCheck = (productId) => (dispatch, getState) => {
  const {
    cart: { checkedProductList: prevList },
  } = getState();

  const idIndex = prevList.findIndex((id) => id === productId);
  let newArray =
    idIndex >= 0
      ? [...prevList.slice(0, idIndex), ...prevList.slice(idIndex + 1)]
      : [...prevList, productId];

  dispatch({ type: 'UPDATE_CHECKED_LIST', payload: { checkedProductList: newArray } });
};

export const deleteCartProductAsync = (productIdArray) => async (dispatch) => {
  const stateName = 'CART_PRODUCT_DELETE';
  dispatch(actionStarted(stateName));

  try {
    const { cart } = await deleteCartProduct(productIdArray);
    dispatch(actionSucceeded(stateName, { cart }));
    dispatch({
      type: 'UPDATE_CHECKED_LIST',
      payload: { checkedProductList: Object.keys(cart) },
    });
  } catch ({ message }) {
    dispatch(actionFailed(stateName, { message }));
  }
};
