import { CartItem } from 'types/domain';

export enum CartListActionType {
  GET_CART_LIST_START = 'cart/GET_CART_LIST_START',
  GET_CART_LIST_SUCCESS = 'cart/GET_CART_LIST_SUCCESS',
  GET_CART_LIST_FAILURE = 'cart/GET_CART_LIST_FAILURE',

  PUT_CART_ITEM_START = 'cart/PUT_CART_ITEM_START',
  PUT_CART_ITEM_SUCCESS = 'cart/PUT_CART_ITEM_SUCCESS',
  PUT_CART_ITEM_FAILURE = 'cart/PUT_CART_ITEM_FAILURE',
}

interface GetCartListStart {
  type: CartListActionType.GET_CART_LIST_START;
}

interface GetCartListSuccess {
  type: CartListActionType.GET_CART_LIST_SUCCESS;
  payload: CartItem[];
}

interface GetCartListFailure {
  type: CartListActionType.GET_CART_LIST_FAILURE;
  payload: string;
}

interface PutCartItemStart {
  type: CartListActionType.PUT_CART_ITEM_START;
}

interface PutCartItemSuccess {
  type: CartListActionType.PUT_CART_ITEM_SUCCESS;
  payload: CartItem;
}

interface PutCartItemFailure {
  type: CartListActionType.PUT_CART_ITEM_FAILURE;
  payload: string;
}

export type CartListAction =
  | GetCartListStart
  | GetCartListSuccess
  | GetCartListFailure
  | PutCartItemStart
  | PutCartItemSuccess
  | PutCartItemFailure;
