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

  PATCH_ALL_CART_SELECTED_START = 'cart/PATCH_ALL_CART_SELECTED_START',
  PATCH_ALL_CART_SELECTED_SUCCESS = 'cart/PATCH_ALL_CART_SELECTED_SUCCESS',
  PATCH_ALL_CART_SELECTED_FAILURE = 'cart/PATCH_ALL_CART_SELECTED_FAILURE',

  DELETE_CART_ITEM_START = 'cart/DELETE_CART_ITEM_START',
  DELETE_CART_ITEM_SUCCESS = 'cart/DELETE_CART_ITEM_SUCCESS',
  DELETE_CART_ITEM_FAILURE = 'cart/DELETE_CART_ITEM_FAILURE',

  DELETE_ALL_CART_ITEM_START = 'cart/DELETE_ALL_CART_ITEM_START',
  DELETE_ALL_CART_ITEM_SUCCESS = 'cart/DELETE_ALL_CART_ITEM_SUCCESS',
  DELETE_ALL_CART_ITEM_FAILURE = 'cart/DELETE_ALL_CART_ITEM_FAILURE',
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

// PATCH: /cartList/:id
interface PatchAllCartSelectedStart {
  type: CartListActionType.PATCH_ALL_CART_SELECTED_START;
}
interface PatchAllCartSelectedSuccess {
  type: CartListActionType.PATCH_ALL_CART_SELECTED_SUCCESS;
  payload: CartItem[];
}
interface PatchAllCartSelectedFailure {
  type: CartListActionType.PATCH_ALL_CART_SELECTED_FAILURE;
  payload: string;
}

// DELETE: /cartList/:id
interface DeleteCartItemStart {
  type: CartListActionType.DELETE_CART_ITEM_START;
}
interface DeleteCartItemSuccess {
  type: CartListActionType.DELETE_CART_ITEM_SUCCESS;
  payload: number;
}
interface DeleteCartItemFailure {
  type: CartListActionType.DELETE_CART_ITEM_FAILURE;
  payload: string;
}

// DELETE: /cartList
interface DeleteAllCartItemStart {
  type: CartListActionType.DELETE_ALL_CART_ITEM_START;
}
interface DeleteAllCartItemSuccess {
  type: CartListActionType.DELETE_ALL_CART_ITEM_SUCCESS;
}
interface DeleteAllCartItemFailure {
  type: CartListActionType.DELETE_ALL_CART_ITEM_FAILURE;
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
  | PatchCartSelectedFailure
  | PatchAllCartSelectedStart
  | PatchAllCartSelectedSuccess
  | PatchAllCartSelectedFailure
  | DeleteCartItemStart
  | DeleteCartItemSuccess
  | DeleteCartItemFailure
  | DeleteAllCartItemStart
  | DeleteAllCartItemSuccess
  | DeleteAllCartItemFailure;
