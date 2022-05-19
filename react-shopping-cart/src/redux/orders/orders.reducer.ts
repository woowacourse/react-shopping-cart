import { Carts } from "type";
import { OrdersAction } from "./orders.action";
import ordersActionTypes from "./orders.types";

interface OrderState {
  loading: boolean;
  orders: Carts;
  error: Error | null;
}

const INITIAL_STATE: OrderState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersReducer = (state = INITIAL_STATE, action: OrdersAction) => {
  switch (action.type) {
    case ordersActionTypes.fetchOrdersStart:
    case ordersActionTypes.addOrderStart:
    case ordersActionTypes.deleteOrderStart:
      return {
        ...state,
        loading: true,
      };
    case ordersActionTypes.fetchOrderSuccess:
      return {
        ...state,
        error: null,
        loading: false,
        orders: action.payload,
      };
    case ordersActionTypes.addOrderSuccess:
      return {
        ...state,
        error: null,
        loading: false,
        orders: action.payload,
      };
    case ordersActionTypes.deleteOrderSuccess:
      return {
        ...state,
        error: null,
        loading: false,
        orders: [],
      };
    case ordersActionTypes.fetchOrderError:
    case ordersActionTypes.addOrderError:
    case ordersActionTypes.deleteOrderError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default ordersReducer;
