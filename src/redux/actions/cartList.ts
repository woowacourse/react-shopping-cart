import { CartItem } from 'types/domain';

export const enum CartListActionType {
  GET_CART_LIST_START = 'cart/GET_CART_LIST_START',
  GET_CART_LIST_SUCCESS = 'cart/GET_CART_LIST_SUCCESS',
  GET_CART_LIST_FAILURE = 'cart/GET_CART_LIST_FAILURE',

  PUT_CART_ITEM_START = 'cart/PUT_CART_ITEM_START',
  PUT_CART_ITEM_SUCCESS = 'cart/PUT_CART_ITEM_SUCCESS',
  PUT_CART_ITEM_FAILURE = 'cart/PUT_CART_ITEM_FAILURE',

  POST_CART_ITEM_START = 'cart/POST_CART_ITEM_START',
  POST_CART_ITEM_SUCCESS = 'cart/POST_CART_ITEM_SUCCESS',
  POST_CART_ITEM_FAILURE = 'cart/POST_CART_ITEM_FAILURE',

  PATCH_CART_SELECTED_START = 'cart/PATCH_CART_SELECTED_START',
  PATCH_CART_SELECTED_SUCCESS = 'cart/PATCH_CART_SELECTED_SUCCESS',
  PATCH_CART_SELECTED_FAILURE = 'cart/PATCH_CART_SELECTED_FAILURE',
}

// GET: /cartList
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

// PUT: /cartList/:id
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

// POST: /cartList
interface PostCartItemStart {
  type: CartListActionType.POST_CART_ITEM_START;
}
interface PostCartItemSuccess {
  type: CartListActionType.POST_CART_ITEM_SUCCESS;
  payload: CartItem;
}
interface PostCartItemFailure {
  type: CartListActionType.POST_CART_ITEM_FAILURE;
  payload: string;
}

// PATCH: /cartList/:id
interface PatchCartSelectedStart {
  type: CartListActionType.PATCH_CART_SELECTED_START;
}
interface PatchCartSelectedSuccess {
  type: CartListActionType.PATCH_CART_SELECTED_SUCCESS;
  payload: CartItem;
}
interface PatchCartSelectedFailure {
  type: CartListActionType.PATCH_CART_SELECTED_FAILURE;
  payload: string;
}

export type CartListAction =
  | GetCartListStart
  | GetCartListSuccess
  | GetCartListFailure
  | PutCartItemStart
  | PutCartItemSuccess
  | PutCartItemFailure
  | PostCartItemStart
  | PostCartItemSuccess
  | PostCartItemFailure
  | PatchCartSelectedStart
  | PatchCartSelectedSuccess
  | PatchCartSelectedFailure;
