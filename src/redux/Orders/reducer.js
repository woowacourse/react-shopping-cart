import {
  GET_ORDERS_ERROR,
  GET_ORDERS_PENDING,
  GET_ORDERS_SUCCESS,
  RESET_ORDERS,
  SET_ORDER_ERROR,
  SET_ORDER_PENDING,
  SET_ORDER_SUCCESS,
} from './actions';

const initState = {
  orderList: [],
  isLoading: false,
};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ORDERS_SUCCESS:
      return {
        orderList: action.order,
        isLoading: false,
      };

    case GET_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case SET_ORDER_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SET_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_ORDERS:
      return initState;

    default:
      return state;
  }
};

export default ordersReducer;
