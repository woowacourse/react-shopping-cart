import { LOCAL_BASE_URL } from 'apis';
import axios from 'axios';
import { CartListActionType } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';

export const getCartList: any = () => async dispatch => {
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

export const putCartItem: any = (cartItem: CartItem) => async dispatch => {
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
