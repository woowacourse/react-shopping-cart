import { cartAPI } from '../../apis';
import {
  ADD_CART_ITEM_FAILURE,
  ADD_CART_ITEM_LOADING,
  ADD_CART_ITEM_SUCCESS,
  DELETE_CART_ITEMS_FAILURE,
  DELETE_CART_ITEMS_LOADING,
  DELETE_CART_ITEMS_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_LOADING,
  DELETE_CART_ITEM_SUCCESS,
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
} from './actions';

export const getCartItemsThunk = () => async dispatch => {
  dispatch({ type: GET_CART_ITEMS_LOADING });

  try {
    const data = await cartAPI.getCartItems();
    const cartItems = data.map(item => ({ ...item, checked: true, quantity: 1 }));

    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: cartItems });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: err });
  }
};

export const addCartItemThunk = item => async (dispatch, getState) => {
  dispatch({ type: ADD_CART_ITEM_LOADING });

  try {
    const { productId } = item;
    const data = getState().cart.items.data;
    const isExisted = data.find(_item => _item.productId === productId);

    if (isExisted) {
      dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: data });
      return;
    }

    const cartId = await cartAPI.addCartItem(productId);
    const cartItem = {
      ...item,
      cartId,
      checked: true,
      quantity: 1,
    };

    dispatch({ type: ADD_CART_ITEM_SUCCESS, payload: [...data, cartItem] });
  } catch (err) {
    console.error(err);
    dispatch({ type: ADD_CART_ITEM_FAILURE, payload: err });
  }
};

export const deleteCartItemThunk = item => async (dispatch, getState) => {
  dispatch({ type: DELETE_CART_ITEM_LOADING });

  try {
    const { cartId, productId } = item;
    await cartAPI.deleteCartItem(cartId);

    const data = getState().cart.items.data;
    const payload = data.filter(item => item.productId !== productId);

    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload });
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CART_ITEM_FAILURE, payload: err });
  }
};

export const deleteCartItemsThunk = () => async (dispatch, getState) => {
  dispatch({ type: DELETE_CART_ITEMS_LOADING });

  try {
    const data = getState().cart.items.data;
    const checkedCartIds = data.filter(item => item.checked).map(item => item.cartId);

    await cartAPI.deleteCartItems(checkedCartIds);

    const payload = data.filter(item => !item.checked);
    dispatch({ type: DELETE_CART_ITEMS_SUCCESS, payload });
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CART_ITEMS_FAILURE, payload: err });
  }
};
