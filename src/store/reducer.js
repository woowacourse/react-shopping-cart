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
    case ACTIONS.GET_CART_ITEM_LIST:
      return {
        loading: true,
        data: [],
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

    case ACTIONS.POST_CART_ITEM:
      return {
        loading: false,
        data: state.data,
        errorMessage: null,
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

    case ACTIONS.DELETE_CART_ITEM:
      return {
        loading: false,
        data: state.data,
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
