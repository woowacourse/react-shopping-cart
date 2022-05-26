import { deleteCartItem, postCartItem, getCartList } from '../../../api';
import { actionTypes } from './actionTypes';

const setCartProductListAsync = () => async (dispatch) => {
  try {
    await getCartList().then((res) => {
      const { data } = res;
      dispatch({
        type: actionTypes.SET_CART_PRODUCT_LIST,
        payload: { products: data },
      });
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const AddProductToCartAsync = (product) => async (dispatch) => {
  try {
    await postCartItem(product).then(() => {
      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: { product },
      });
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const removeProductToCartAsync = (id) => async (dispatch) => {
  try {
    await deleteCartItem({ id }).then(() => {
      dispatch({
        type: actionTypes.REMOVE_PRODUCT_TO_CART,
        payload: { id },
      });
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

const checkProduct = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CHECK,
    payload,
  });
};

const unCheckProduct = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UN_CHECK,
    payload,
  });
};

const allCheckProduct = () => (dispatch) => dispatch({ type: actionTypes.ALL_CHECK });

const allUnCheckProduct = () => (dispatch) => dispatch({ type: actionTypes.ALL_UN_CHECK });

const setOrderDetail = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.ORDER_DETAIL,
    payload,
  });
};

export {
  AddProductToCartAsync,
  removeProductToCartAsync,
  setCartProductListAsync,
  checkProduct,
  unCheckProduct,
  allCheckProduct,
  allUnCheckProduct,
  setOrderDetail,
};
