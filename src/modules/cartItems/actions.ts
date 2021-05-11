import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import api from '../../api';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';

export const ADD_CART_ITEM_REQUEST = 'cartItems/ADD_CART_ITEM_REQUEST' as const;
export const ADD_CART_ITEM_SUCCESS = 'cartItems/ADD_CART_ITEM_SUCCESS' as const;
export const ADD_CART_ITEM_FAILURE = 'cartItems/ADD_CART_ITEM_FAILURE' as const;

export const GET_CART_ITEMS_REQUEST = 'cartItems/GET_CART_ITEMS_REQUEST' as const;
export const GET_CART_ITEMS_SUCCESS = 'cartItems/GET_CART_ITEMS_SUCCESS' as const;
export const GET_CART_ITEMS_FAILURE = 'cartItems/GET_CART_ITEMS_FAILURE' as const;

interface AddCartItemRequestAction {
  type: typeof ADD_CART_ITEM_REQUEST;
  product: T.Product;
}

interface AddCartItemSuccessAction {
  type: typeof ADD_CART_ITEM_SUCCESS;
}

interface AddCartItemFailureAction {
  type: typeof ADD_CART_ITEM_FAILURE;
  error: AxiosError;
}

interface GetCartItemRequestAction {
  type: typeof GET_CART_ITEMS_REQUEST;
}

interface GetCartItemSuccessAction {
  type: typeof GET_CART_ITEMS_SUCCESS;
  cartItems: T.CartItem[];
}

interface GetCartItemFailureAction {
  type: typeof GET_CART_ITEMS_FAILURE;
  error: AxiosError;
}

export type AddCartItemAction = AddCartItemRequestAction | AddCartItemSuccessAction | AddCartItemFailureAction;
export type GetCartItemsAction = GetCartItemRequestAction | GetCartItemSuccessAction | GetCartItemFailureAction;

export const addCartItemRequest = (product: T.Product) => async (dispatch: Dispatch<AddCartItemAction>) => {
  dispatch({ type: ADD_CART_ITEM_REQUEST, product });

  try {
    const cartItem = await api.get(`/cart?product.id=${product.id}`);

    if (cartItem.data.length) {
      throw Error(MESSAGE.EXIST_CART_ITEM);
    }

    await api.post('/cart', { product, quantity: 1 });

    dispatch({ type: ADD_CART_ITEM_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_CART_ITEM_FAILURE, error });
  }
};

export const getCartItemsRequest = () => async (dispatch: Dispatch<GetCartItemsAction>) => {
  dispatch({ type: GET_CART_ITEMS_REQUEST });

  try {
    const response = await api.get('/cart');
    const cartItems = response.data;

    dispatch({ type: GET_CART_ITEMS_SUCCESS, cartItems });
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_FAILURE, error });
  }
};
