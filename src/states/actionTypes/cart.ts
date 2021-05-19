import { AxiosError } from 'axios';

export interface cartLoading {
  type: typeof LOADING;
}

export interface cartLoadingSuccess {
  type: typeof LOADING_SUCCESS;
  payload?: CartItem[] | any;
}

export interface cartLoadingFailure {
  type: typeof LOADING_FAILURE;
  loadingError: AxiosError;
}

export interface cartRequest {
  type: typeof REQUEST;
}

export interface cartRequestSuccess {
  type: typeof REQUEST_SUCCESS;
  payload?: CartItem[] | any;
}

export interface cartRequestFailure {
  type: typeof REQUEST_FAILURE;
  error: Error;
}

export interface cartChangeQuantity {
  type: typeof CHANGE_QUANTITY;
  payload?: CartItem[] | any;
}
export interface cartSelectItem {
  type: typeof SELECT_CART_ITEM;
  payload?: CartItem[] | any;
}

export interface cartDeleteOrderedItems {
  type: typeof DELETE_ORDERED_ITEMS;
  payload?: CartItem[] | any;
}

export type CartAction =
  | cartLoading
  | cartLoadingSuccess
  | cartLoadingFailure
  | cartRequest
  | cartRequestSuccess
  | cartRequestFailure
  | cartChangeQuantity
  | cartSelectItem
  | cartDeleteOrderedItems;

export const LOADING = 'cart/LOADING';
export const LOADING_SUCCESS = 'cart/LOADING_SUCCESS';
export const LOADING_FAILURE = 'cart/LOADING_FAILURE';
export const REQUEST = 'cart/REQUEST';
export const REQUEST_SUCCESS = 'cart/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'cart/REQUEST_FAILURE';
export const CHANGE_QUANTITY = 'cart/CHANGE_QUANTITY';
export const SELECT_CART_ITEM = 'cart/SELECT_CART_ITEM';
export const SELECT_ALL_CART_ITEMS = 'cart/SELECT_ALL_CART_ITEMS';
export const DELETE_ORDERED_ITEMS = 'cart/DELETE_ORDERED_ITEMS';
