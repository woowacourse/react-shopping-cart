import { CartType } from "../../types/cart";

export enum CartActionType {
  GET_CART_LIST = "cart/GET_CART_LIST",
  POST_CART = "cart/POST_CART",
  POST_CART_SUCCESS = "cart/POST_CART_SUCCESS",
  POST_CART_ERROR = "cart/POST_CART_ERROR",
}

export interface Cart {
  isLoading: boolean;
  data: CartType | {};
  error: null | string;
}

interface GetCartList {
  type: CartActionType.GET_CART_LIST;
}

interface PostCart {
  type: CartActionType.POST_CART;
  payload: CartType;
}

interface PostCartSuccess {
  type: CartActionType.POST_CART_SUCCESS;
  payload: CartType;
}

interface PostCartError {
  type: CartActionType.POST_CART_ERROR;
  error: string;
}

export type CartAction =
  | GetCartList
  | PostCart
  | PostCartSuccess
  | PostCartError;
