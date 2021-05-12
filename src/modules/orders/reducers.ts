import produce, { Draft } from 'immer';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  RESET_ORDER_STATE,
  CreateOrderAction,
  ResetOrderState,
} from './actions';
import * as T from '../../types';

export type OrdersState = {
  orders: {
    isLoading: boolean;
    data: T.Order[];
    success: boolean;
    error: Error | null;
  };
};

const initialState: OrdersState = {
  orders: {
    isLoading: false,
    data: [],
    success: false,
    error: null,
  },
};

export const ordersReducer = (state: OrdersState = initialState, action: CreateOrderAction | ResetOrderState) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return produce(state, (draft: Draft<OrdersState>) => {
        draft.orders.isLoading = true;
        draft.orders.success = false;
        draft.orders.error = null;
      });

    case CREATE_ORDER_SUCCESS:
      return produce(state, (draft: Draft<OrdersState>) => {
        draft.orders.isLoading = false;
        draft.orders.success = true;
        draft.orders.error = null;
      });

    case CREATE_ORDER_FAILURE:
      return produce(state, (draft: Draft<OrdersState>) => {
        draft.orders.isLoading = false;
        draft.orders.success = false;
        draft.orders.error = action.error;
      });

    case RESET_ORDER_STATE:
      return { ...initialState };

    default:
      return {
        ...state,
      };
  }
};
