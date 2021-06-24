import { LOADING, FAILURE, SUCCESS } from '../../constants/status';
import {
  ADD_ORDER_FAILURE,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
} from './actions';

const initialState = {
  orders: {
    status: null,
    data: [],
    error: null,
  },
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_LOADING:
      return {
        ...state,
        orders: {
          status: LOADING,
          data: [],
          error: null,
        },
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: {
          status: FAILURE,
          data: [],
          error: action.payload,
        },
      };

    case ADD_ORDER_LOADING:
      return {
        ...state,
        orders: {
          status: LOADING,
          data: state.orders.data,
          error: null,
        },
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case ADD_ORDER_FAILURE:
      return {
        ...state,
        orders: {
          status: FAILURE,
          data: state.orders.data,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default orderReducer;
