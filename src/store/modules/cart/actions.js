import { actionTypes } from './actionTypes';

const AddProductToCart = (product) => (dispatch) => {
  try {
    dispatch({
      type: actionTypes.ADD_PRODUCT_TO_CART,
      payload: product,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const removeProductToCart = (id) => (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REMOVE_PRODUCT_TO_CART,
      payload: id,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

export { AddProductToCart, removeProductToCart };
