import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import api from '../../api';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';

export const ADD_CART_ITEM_REQUEST = 'cartItems/ADD_CART_ITEM_REQUEST' as const;
export const ADD_CART_ITEM_SUCCESS = 'cartItems/ADD_CART_ITEM_SUCCESS' as const;
export const ADD_CART_ITEM_FAILURE = 'cartItems/ADD_CART_ITEM_FAILURE' as const;

export const GET_CART_ITEM_REQUEST = 'cartItems/GET_CART_ITEM_REQUEST' as const;
export const GET_CART_ITEM_SUCCESS = 'cartItems/GET_CART_ITEM_SUCCESS' as const;
export const GET_CART_ITEM_FAILURE = 'cartItems/GET_CART_ITEM_FAILURE' as const;

interface AddCartItemRequestAction {
  type: typeof ADD_CART_ITEM_REQUEST;
  productId: T.Product['id'];
}

interface AddCartItemSuccessAction {
  type: typeof ADD_CART_ITEM_SUCCESS;
}

interface AddCartItemFailureAction {
  type: typeof ADD_CART_ITEM_FAILURE;
  error: AxiosError;
}

interface GetCartItemRequestAction {
  type: typeof GET_CART_ITEM_REQUEST;
}

interface GetCartItemSuccessAction {
  type: typeof GET_CART_ITEM_SUCCESS;
  cartItem: T.CartItem;
}

interface GetCartItemFailureAction {
  type: typeof GET_CART_ITEM_FAILURE;
  error: AxiosError;
}

export type AddCartItemAction = AddCartItemRequestAction | AddCartItemSuccessAction | AddCartItemFailureAction;
export type GetCartItemAction = GetCartItemRequestAction | GetCartItemSuccessAction | GetCartItemFailureAction;

export const addCartItemRequest = (productId: T.Product['id']) => async (dispatch: Dispatch<AddCartItemAction>) => {
  dispatch({ type: ADD_CART_ITEM_REQUEST, productId });

  try {
    const cartItem = await api.get(`/carts?productId=${productId}`);

    if (cartItem.data.length) {
      throw Error(MESSAGE.EXIST_CART_ITEM);
    }

    await api.post('/carts', { id: nanoid(10), productId, quantity: 1 });

    dispatch({ type: ADD_CART_ITEM_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_FAILURE, error });
  }
};
