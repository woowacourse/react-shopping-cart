import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const initialState = {
  cart: {
    loading: true,
    data: [],
    errorMessage: null,
  },
};

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART_ITEM_LIST_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case ACTIONS.GET_CART_ITEM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ACTIONS.GET_CART_ITEM_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case ACTIONS.POST_CART_ITEM_PENDING:
      return {
        ...state,
        loading: false,
        errorMessage: null,
      };

    case ACTIONS.POST_CART_ITEM_CANCEL:
      return {
        ...state,
        loading: false,
      };

    case ACTIONS.POST_CART_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    case ACTIONS.POST_CART_ITEM_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ACTIONS.DELETE_CART_ITEM_PENDING:
      return {
        ...state,
        loading: false,
        errorMessage: null,
      };

    case ACTIONS.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    case ACTIONS.DELETE_CART_ITEM_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;
