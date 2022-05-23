import { LOCAL_BASE_URL } from 'apis';
import { CartListActionType, CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';
import type { Dispatch } from 'redux';
import axios from 'axios';

export const getCartList = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.GET_CART_LIST_START });

  try {
    const response = await axios.get(`${LOCAL_BASE_URL}/cartList`);

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
    const response = await axios.put(`${LOCAL_BASE_URL}/cartList/${cartItem.id}`, cartItem);

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
    const response = await axios.post(`${LOCAL_BASE_URL}/cartList`, cartItem);

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

export const removeCartItem =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch({ type: CartListActionType.REMOVE_CART_ITEM_START });

    try {
      const response = await axios.delete(`${LOCAL_BASE_URL}/cartList/${cartItem.id}`);

      dispatch({
        type: CartListActionType.REMOVE_CART_ITEM_SUCCESS,
        payload: cartItem,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.REMOVE_CART_ITEM_FAILURE,
        payload: e.message,
      });
    }
  };
