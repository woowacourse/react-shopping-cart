import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';
import { CartListAction, cartListAction } from 'redux/cartList/action';
import { RootState } from 'redux/rootReducer';
import { CartItem } from 'types/domain';

export const getCartListRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.getCartListStart());
  try {
    const response = await axios.get(`${BASE_URL}/cartList`);

    dispatch(cartListAction.getCartListSuccess(response.data));
  } catch (e) {
    dispatch(cartListAction.getCartListFailure(e.message));
  }
};

export const putCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListAction.putCartItemStart());
    try {
      const response = await axios.put(`${BASE_URL}/cartList/${cartItem.id}`, cartItem);

      dispatch(cartListAction.putCartItemSuccess(response.data));
    } catch (e) {
      dispatch(cartListAction.putCartItemFailure(e.message));
    }
  };

export const postCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListAction.postCartItemStart());
    try {
      const response = await axios.post(`${BASE_URL}/cartList`, cartItem);

      dispatch(cartListAction.postCartItemSuccess(response.data));
    } catch (e) {
      dispatch(cartListAction.postCartItemFailure(e.message));
    }
  };

export const patchCartSelectedRequest =
  (id: number) => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListAction.patchCartSelectedStart());
    try {
      const { data: cartList } = getState().cartList;
      const isSelected = cartList.find(item => item.id === id).isSelected;
      const response = await axios.patch(`${BASE_URL}/cartList/${id}`, { isSelected: !isSelected });

      dispatch(cartListAction.patchCartSelectedSuccess(response.data));
    } catch (e) {
      dispatch(cartListAction.patchCartSelectedFailure(e.message));
    }
  };

export const patchAllCartSelectedRequest =
  (isAllSelected: boolean) =>
  async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListAction.patchAllCartSelectedStart());
    try {
      const { data: cartList } = getState().cartList;

      cartList.forEach(
        async item =>
          await axios.patch(`${BASE_URL}/cartList/${item.id}`, { isSelected: !isAllSelected })
      );

      dispatch(cartListAction.patchAllCartSelectedSuccess(!isAllSelected));
    } catch (e) {
      dispatch(cartListAction.patchAllCartSelectedFailure(e.message));
    }
  };

export const deleteCartItemRequest = (id: number) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.deleteCartItemStart());
  try {
    await axios.delete(`${BASE_URL}/cartList/${id}`);

    dispatch(cartListAction.deleteCartItemSuccess(id));
  } catch (e) {
    dispatch(cartListAction.deleteCartItemFailure(e.message));
  }
};

export const deleteAllCartItemRequest =
  () => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListAction.deleteAllCartItemStart());
    try {
      const { data: cartList } = getState().cartList;

      cartList.forEach(async item => await axios.delete(`${BASE_URL}/cartList/${item.id}`));

      dispatch(cartListAction.deleteAllCartItemSuccess());
    } catch (e) {
      dispatch(cartListAction.deleteAllCartItemFailure(e.message));
    }
  };
