import { Dispatch } from 'redux';
import { requestGetCartItems } from '../../apis/cart';
import { CartItem } from '../../type';
import { parseCartItemData } from '../../utils/parseData';
import { CartAction, SetCartItemsAction } from './type';

export const GET_CART_ITEMS_REQUEST = 'cart/GET_CART_ITEMS_REQUEST';
export const GET_CART_ITEMS_SUCCESS = 'cart/GET_CART_ITEMS_SUCCESS';
export const GET_CART_ITEMS_FAILURE = 'cart/GET_CART_ITEMS_FAILURE';

export const SET_CART_ITEMS = 'cart/SET_CART_ITEMS';

const getCartItems = () => async (dispatch: Dispatch<CartAction>) => {
  dispatch({ type: GET_CART_ITEMS_REQUEST });
  try {
    const response = await requestGetCartItems();
    const cartItems = response.data.map(parseCartItemData);
    dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: cartItems });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_CART_ITEMS_FAILURE, error });
  }
};

const setCartItems = (items: CartItem[]): SetCartItemsAction => ({ type: SET_CART_ITEMS, payload: items });

export const asyncAction = {
  getCartItems,
};

export const action = {
  setCartItems,
};
