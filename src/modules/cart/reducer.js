import { LOADING, FAILURE, SUCCESS } from '../../constants/status';
import {
  ADD_CART_ITEM_FAILURE,
  ADD_CART_ITEM_LOADING,
  ADD_CART_ITEM_SUCCESS,
  CHANGE_CART_ITEM_QUANTITY,
  DELETE_CART_ITEMS_FAILURE,
  DELETE_CART_ITEMS_LOADING,
  DELETE_CART_ITEMS_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_LOADING,
  DELETE_CART_ITEM_SUCCESS,
  GET_CART_ITEMS_FAILURE,
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
  TOGGLE_ALL_CART_ITEM,
  TOGGLE_CART_ITEM,
} from './actions';

const initialState = {
  items: {
    status: null,
    data: [],
    error: null,
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS_LOADING:
      return {
        ...state,
        items: {
          ...state.items,
          status: LOADING,
          error: null,
        },
      };

    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case GET_CART_ITEMS_FAILURE:
      return {
        ...state,
        items: {
          status: FAILURE,
          data: [],
          error: action.payload,
        },
      };

    case ADD_CART_ITEM_LOADING:
      return {
        ...state,
        items: {
          status: LOADING,
          data: state.items.data,
          error: null,
        },
      };

    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case ADD_CART_ITEM_FAILURE:
      return {
        ...state,
        items: {
          status: FAILURE,
          data: state.items.data,
          error: action.payload,
        },
      };

    case DELETE_CART_ITEM_LOADING:
      return {
        ...state,
        items: {
          status: LOADING,
          data: state.items.data,
          error: null,
        },
      };

    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        items: {
          status: FAILURE,
          data: state.items.data,
          error: action.payload,
        },
      };

    case DELETE_CART_ITEMS_LOADING:
      return {
        ...state,
        items: {
          status: LOADING,
          data: state.items.data,
          error: null,
        },
      };

    case DELETE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          status: SUCCESS,
          data: action.payload,
          error: null,
        },
      };

    case DELETE_CART_ITEMS_FAILURE:
      return {
        ...state,
        items: {
          status: FAILURE,
          data: state.items.data,
          error: action.payload,
        },
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          data: state.items.data.map(item =>
            item.productId === action.payload
              ? {
                  ...item,
                  checked: !item.checked,
                }
              : item,
          ),
        },
      };

    case TOGGLE_ALL_CART_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          data: state.items.data.map(item => ({ ...item, checked: !action.payload })),
        },
      };

    case CHANGE_CART_ITEM_QUANTITY:
      return {
        ...state,
        items: {
          ...state.items,
          data: state.items.data.map(item =>
            item.productId === action.payload.id
              ? {
                  ...item,
                  quantity: action.payload.quantity,
                }
              : item,
          ),
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
