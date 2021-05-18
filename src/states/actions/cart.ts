import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { STATUS_CODE, URL } from '../../constants';
import { FORMAT_DATA } from '../../services/formatData';
import { REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, CartAction } from '../actionTypes/cart';

export const getCart = () => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.get(URL.CART);

    if (response.status !== STATUS_CODE.GET_SUCCESS) {
      throw new Error('장바구니 정보를 불러오는데 실패하였습니다.');
    }

    dispatch({ type: REQUEST_SUCCESS, payload: FORMAT_DATA.CART(response.data) });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};

export const addCartItem = (cartItem: CartItem) => async (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.post(`${URL.CART}/${cartItem.id}`);

    if (response.status !== STATUS_CODE.POST_SUCCESS) {
      throw new Error('장바구니에 상품을 담는데 실패하였습니다.');
    }

    const { cart: prevCart } = getState().cart;
    dispatch({ type: REQUEST_SUCCESS, payload: [...prevCart, cartItem] });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};

export const deleteCartItem = (cartItem: CartItem) => async (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.delete(`${URL.CART}/${cartItem.id}`);

    if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
      throw new Error('상품을 장바구니에서 삭제하는데 실패하였습니다.');
    }

    const { cart: prevCart } = getState().cart;
    dispatch({ type: REQUEST_SUCCESS, payload: prevCart.filter(item => item.id !== cartItem.id) });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};
