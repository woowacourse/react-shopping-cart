import { deleteCartItem, postCartItem, getCartList } from '../../../api';
import { actionTypes } from './actionTypes';

const setCartProductListAsync = () => async (dispatch) => {
  try {
    const { data } = await getCartList();

    dispatch({
      type: actionTypes.SET_CART_PRODUCT_LIST,
      payload: data,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const AddProductToCartAsync = (product) => async (dispatch) => {
  try {
    await postCartItem(product);

    dispatch({
      type: actionTypes.ADD_PRODUCT_TO_CART,
      payload: product,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const removeProductToCartAsync = (id) => async (dispatch) => {
  try {
    await deleteCartItem({ id });

    dispatch({
      type: actionTypes.REMOVE_PRODUCT_TO_CART,
      payload: id,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

export { AddProductToCartAsync, removeProductToCartAsync, setCartProductListAsync };
