import { CartItem } from 'types/domain';

export const CartListActionType = {
  GET_CART_LIST_START: 'cart/GET_CART_LIST_START',
  GET_CART_LIST_SUCCESS: 'cart/GET_CART_LIST_SUCCESS',
  GET_CART_LIST_FAILURE: 'cart/GET_CART_LIST_FAILURE',

  PUT_CART_ITEM_START: 'cart/PUT_CART_ITEM_START',
  PUT_CART_ITEM_SUCCESS: 'cart/PUT_CART_ITEM_SUCCESS',
  PUT_CART_ITEM_FAILURE: 'cart/PUT_CART_ITEM_FAILURE',

  POST_CART_ITEM_START: 'cart/POST_CART_ITEM_START',
  POST_CART_ITEM_SUCCESS: 'cart/POST_CART_ITEM_SUCCESS',
  POST_CART_ITEM_FAILURE: 'cart/POST_CART_ITEM_FAILURE',

  PATCH_CART_SELECTED_START: 'cart/PATCH_CART_SELECTED_START',
  PATCH_CART_SELECTED_SUCCESS: 'cart/PATCH_CART_SELECTED_SUCCESS',
  PATCH_CART_SELECTED_FAILURE: 'cart/PATCH_CART_SELECTED_FAILURE',

  PATCH_ALL_CART_SELECTED_START: 'cart/PATCH_ALL_CART_SELECTED_START',
  PATCH_ALL_CART_SELECTED_SUCCESS: 'cart/PATCH_ALL_CART_SELECTED_SUCCESS',
  PATCH_ALL_CART_SELECTED_FAILURE: 'cart/PATCH_ALL_CART_SELECTED_FAILURE',

  DELETE_CART_ITEM_START: 'cart/DELETE_CART_ITEM_START',
  DELETE_CART_ITEM_SUCCESS: 'cart/DELETE_CART_ITEM_SUCCESS',
  DELETE_CART_ITEM_FAILURE: 'cart/DELETE_CART_ITEM_FAILURE',

  DELETE_ALL_CART_ITEM_START: 'cart/DELETE_ALL_CART_ITEM_START',
  DELETE_ALL_CART_ITEM_SUCCESS: 'cart/DELETE_ALL_CART_ITEM_SUCCESS',
  DELETE_ALL_CART_ITEM_FAILURE: 'cart/DELETE_ALL_CART_ITEM_FAILURE',
} as const;

const getCartListStart = () => ({ type: CartListActionType.GET_CART_LIST_START });
const getCartListSuccess = (cartList: CartItem[]) => ({
  type: CartListActionType.GET_CART_LIST_SUCCESS,
  payload: cartList,
});
const getCartListFailure = (message: string) => ({
  type: CartListActionType.GET_CART_LIST_FAILURE,
  payload: message,
});

const putCartItemStart = () => ({
  type: CartListActionType.PUT_CART_ITEM_START,
});
const putCartItemSuccess = (cartItem: CartItem) => ({
  type: CartListActionType.PUT_CART_ITEM_SUCCESS,
  payload: cartItem,
});
const putCartItemFailure = (message: string) => ({
  type: CartListActionType.PUT_CART_ITEM_FAILURE,
  payload: message,
});

const postCartItemStart = () => ({
  type: CartListActionType.POST_CART_ITEM_START,
});
const postCartItemSuccess = (cartItem: CartItem) => ({
  type: CartListActionType.POST_CART_ITEM_SUCCESS,
  payload: cartItem,
});
const postCartItemFailure = (message: string) => ({
  type: CartListActionType.POST_CART_ITEM_FAILURE,
  payload: message,
});

const patchCartSelectedStart = () => ({
  type: CartListActionType.PATCH_CART_SELECTED_START,
});
const patchCartSelectedSuccess = (cartItem: CartItem) => ({
  type: CartListActionType.PATCH_CART_SELECTED_SUCCESS,
  payload: cartItem,
});
const patchCartSelectedFailure = (message: string) => ({
  type: CartListActionType.PATCH_CART_SELECTED_FAILURE,
  payload: message,
});

const patchAllCartSelectedStart = () => ({
  type: CartListActionType.PATCH_ALL_CART_SELECTED_START,
});
const patchAllCartSelectedSuccess = (isAllSelected: boolean) => ({
  type: CartListActionType.PATCH_ALL_CART_SELECTED_SUCCESS,
  payload: isAllSelected,
});
const patchAllCartSelectedFailure = (message: string) => ({
  type: CartListActionType.PATCH_ALL_CART_SELECTED_FAILURE,
  payload: message,
});

const deleteCartItemStart = () => ({
  type: CartListActionType.DELETE_CART_ITEM_START,
});
const deleteCartItemSuccess = (id: number) => ({
  type: CartListActionType.DELETE_CART_ITEM_SUCCESS,
  payload: id,
});
const deleteCartItemFailure = (message: string) => ({
  type: CartListActionType.DELETE_CART_ITEM_FAILURE,
  payload: message,
});

const deleteAllCartItemStart = () => ({
  type: CartListActionType.DELETE_ALL_CART_ITEM_START,
});
const deleteAllCartItemSuccess = () => ({
  type: CartListActionType.DELETE_ALL_CART_ITEM_SUCCESS,
});
const deleteAllCartItemFailure = (message: string) => ({
  type: CartListActionType.DELETE_ALL_CART_ITEM_FAILURE,
  payload: message,
});

export const cartListAction = {
  getCartListStart,
  getCartListSuccess,
  getCartListFailure,
  putCartItemStart,
  putCartItemSuccess,
  putCartItemFailure,
  postCartItemStart,
  postCartItemSuccess,
  postCartItemFailure,
  patchCartSelectedStart,
  patchCartSelectedSuccess,
  patchCartSelectedFailure,
  patchAllCartSelectedStart,
  patchAllCartSelectedSuccess,
  patchAllCartSelectedFailure,
  deleteCartItemStart,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  deleteAllCartItemStart,
  deleteAllCartItemSuccess,
  deleteAllCartItemFailure,
};

type CartListActionCreators = typeof cartListAction[keyof typeof cartListAction];
export type CartListAction = ReturnType<CartListActionCreators>;
