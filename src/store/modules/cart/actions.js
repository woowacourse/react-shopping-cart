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

const removeProductsToCartAsync = (ids) => async (dispatch) => {
  try {
    // TODO
    // await deleteCartItem({ ids });
    // dispatch({
    //   type: actionTypes.REMOVE_PRODUCTS_TO_CART,
    //   payload: ids,
    // });
  } catch (err) {
    console.log('err', err.message);
  }
};

const checkProduct = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.CHECK,
    payload: id,
  });
};

const unCheckProduct = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.UN_CHECK,
    payload: id,
  });
};

const allCheckProduct = () => (dispatch) => dispatch({ type: actionTypes.ALL_CHECK });

const allUnCheckProduct = () => (dispatch) => dispatch({ type: actionTypes.ALL_UN_CHECK });

export {
  AddProductToCartAsync,
  removeProductToCartAsync,
  removeProductsToCartAsync,
  setCartProductListAsync,
  checkProduct,
  unCheckProduct,
  allCheckProduct,
  allUnCheckProduct,
};
