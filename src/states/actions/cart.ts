import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { STATUS_CODE, URL } from '../../constants';
import { FORMAT_DATA } from '../../services/formatData';
import {
  REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  CHANGE_QUANTITY,
  CartAction,
  SELECT_CART_ITEM,
} from '../actionTypes/cart';

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

export const addCartItem = (product: Product) => async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
  try {
    const response = await axios.post(`${URL.CART}`, { product_id: product.id });

    if (response.status !== STATUS_CODE.POST_SUCCESS) {
      throw new Error('장바구니에 상품을 담는데 실패하였습니다.');
    }

    const { cart: prevCart } = getState().cart;
    const cartId = response.headers.location.split('/').slice(-1)[0];
    dispatch({
      type: REQUEST_SUCCESS,
      payload: [...prevCart, { ...product, cartId, quantity: '1', isSelected: true }],
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};

export const deleteCartItem = (cartItem: CartItem) => async (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  try {
    const response = await axios.delete(`${URL.CART}/${cartItem.cartId}`);

    if (response.status !== STATUS_CODE.DELETE_SUCCESS) {
      throw new Error('상품을 장바구니에서 삭제하는데 실패하였습니다.');
    }

    const { cart: prevCart } = getState().cart;
    dispatch({ type: REQUEST_SUCCESS, payload: prevCart.filter(item => item.cartId !== cartItem.cartId) });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};

export const changeCartItemQuantity = (productId: CartItem['productId'], quantity: string) => (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  const { cart: prevCart } = getState().cart;
  dispatch({
    type: CHANGE_QUANTITY,
    payload: prevCart.map(item => (item.productId === productId ? { ...item, quantity } : item)),
  });
};

export const selectCartItem = (productId: CartItem['productId']) => (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  const { cart: prevCart } = getState().cart;
  dispatch({
    type: SELECT_CART_ITEM,
    payload: prevCart.map(item => (item.productId === productId ? { ...item, isSelected: !item.isSelected } : item)),
  });
};

export const selectAllCartItems = (isSelectAll: boolean) => (
  dispatch: Dispatch<CartAction>,
  getState: () => RootState
) => {
  const { cart: prevCart } = getState().cart;
  dispatch({
    type: SELECT_CART_ITEM,
    payload: prevCart.map(item => ({ ...item, isSelected: isSelectAll })),
  });
};
