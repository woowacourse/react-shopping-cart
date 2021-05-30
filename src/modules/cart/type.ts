import { AxiosError } from 'axios';
import { CartItem } from '../../type';
import { GET_CART_ITEMS_FAILURE, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, SET_CART_ITEMS } from './actions';

export interface GetCartRequestAction {
  type: typeof GET_CART_ITEMS_REQUEST;
}

export interface GetCartSuccessAction {
  type: typeof GET_CART_ITEMS_SUCCESS;
  payload: CartItem[];
}

export interface GetCartFailureAction {
  type: typeof GET_CART_ITEMS_FAILURE;
  error: AxiosError | Error;
}

export interface SetCartItemsAction {
  type: typeof SET_CART_ITEMS;
  payload: CartItem[];
}

export type CartAction = GetCartRequestAction | GetCartSuccessAction | GetCartFailureAction | SetCartItemsAction;

export interface CartState {
  loading: boolean;
  error: AxiosError | Error | null;
  cartItems: CartItem[];
}
