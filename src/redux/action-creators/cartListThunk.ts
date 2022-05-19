import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';
import { CartListAction, CartListActionType } from 'redux/actions/cartList';
import { RootState } from 'redux/reducers';
import { CartItem } from 'types/domain';

export const getCartListRequest = () => async (dispatch: Dispatch<CartListAction>) => {
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

export const putCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
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

export const postCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
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

export const patchCartSelectedRequest =
  (id: number) => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch({ type: CartListActionType.PATCH_CART_SELECTED_START });
    try {
      const { data: cartList } = getState().cartListReducer;
      const isSelected = cartList.find(item => item.id === id).isSelected;
      const response = await axios.patch(`${BASE_URL}/cartList/${id}`, { isSelected: !isSelected });

      dispatch({
        type: CartListActionType.PATCH_CART_SELECTED_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.PATCH_CART_SELECTED_FAILURE,
        payload: e.message,
      });
    }
  };

export const patchAllCartSelectedRequest =
  (isAllSelected: boolean) =>
  async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch({ type: CartListActionType.PATCH_ALL_CART_SELECTED_START });
    try {
      const { data: cartList } = getState().cartListReducer;

      cartList.forEach(
        async item =>
          await axios.patch(`${BASE_URL}/cartList/${item.id}`, { isSelected: !isAllSelected })
      );

      const newCartList = cartList.map(item => ({ ...item, isSelected: !isAllSelected }));

      dispatch({
        type: CartListActionType.PATCH_ALL_CART_SELECTED_SUCCESS,
        payload: newCartList,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.PATCH_ALL_CART_SELECTED_FAILURE,
        payload: e.message,
      });
    }
  };

export const deleteCartItemRequest = (id: number) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.DELETE_CART_ITEM_START });
  try {
    await axios.delete(`${BASE_URL}/cartList/${id}`);

    dispatch({
      type: CartListActionType.DELETE_CART_ITEM_SUCCESS,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.DELETE_CART_ITEM_FAILURE,
      payload: e.message,
    });
  }
};

export const deleteAllCartItemRequest =
  () => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch({ type: CartListActionType.DELETE_ALL_CART_ITEM_START });
    try {
      const { data: cartList } = getState().cartListReducer;

      cartList.forEach(async item => await axios.delete(`${BASE_URL}/cartList/${item.id}`));

      dispatch({
        type: CartListActionType.DELETE_ALL_CART_ITEM_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.DELETE_ALL_CART_ITEM_FAILURE,
        payload: e.message,
      });
    }
  };
