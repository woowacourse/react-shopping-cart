import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import api from '../../api';
import * as T from '../../types';

export const CREATE_ORDER_REQUEST = 'orders/CREATE_ORDER_REQUEST' as const;
export const CREATE_ORDER_SUCCESS = 'orders/CREATE_ORDER_SUCCESS' as const;
export const CREATE_ORDER_FAILURE = 'orders/CREATE_ORDER_FAILURE' as const;
export const RESET_ORDER_STATE = 'orders/RESET_ORDER_STATE' as const;

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
}

interface CreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
  error: AxiosError;
}

export type ResetOrderState = {
  type: typeof RESET_ORDER_STATE;
};

export type CreateOrderAction = CreateOrderRequestAction | CreateOrderSuccessAction | CreateOrderFailureAction;

export const createOrderRequest = (cartItems: T.CartItem[]) => async (dispatch: Dispatch<CreateOrderAction>) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    await api.post('/orders', { cartItems });

    dispatch({ type: CREATE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, error });
  }
};

export const resetOrderState = () => ({
  type: RESET_ORDER_STATE,
});
