import { AxiosError } from 'axios';

export interface cartRequestAction {
  type: typeof REQUEST;
}

export interface cartSuccessAction {
  type: typeof REQUEST_SUCCESS;
  payload?: CartItem[] | any;
}

export interface cartFailureAction {
  type: typeof REQUEST_FAILURE;
  error: AxiosError;
}

export type CartAction = cartRequestAction | cartSuccessAction | cartFailureAction;

export const REQUEST = 'cart/REQUEST';
export const REQUEST_SUCCESS = 'cart/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'cart/REQUEST_FAILURE';
