import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';
import { CartListAction, CartListActionType } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

export const getCartList = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.GET_CART_LIST_START });
  try {
    const response = await axios.get(`${BASE_URL}/cartList`);

    dispatch({
      type: CartListActionType.GET_CART_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.GET_CART_LIST_FAILURE,
      payload: e.message,
    });
  }
};

export const putCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.PUT_CART_ITEM_START });
  try {
    const response = await axios.put(`${BASE_URL}/cartList/${cartItem.id}`, cartItem);

    dispatch({
      type: CartListActionType.PUT_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.PUT_CART_ITEM_FAILURE,
      payload: e.message,
    });
  }
};

export const postCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.POST_CART_ITEM_START });
  try {
    const response = await axios.post(`${BASE_URL}/cartList`, cartItem);

    dispatch({
      type: CartListActionType.POST_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.POST_CART_ITEM_FAILURE,
      payload: e.message,
    });
  }
};
