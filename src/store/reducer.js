import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const initialState = {
  productList: {
    loading: true,
    data: [],
    errorMessage: null,
  },
  productDetail: {
    loading: true,
    data: [],
    errorMessage: null,
  },
  cart: {
    loading: true,
    data: [],
    errorMessage: null,
  },
};

const productListReducer = (state = initialState.productList, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCT_LIST:
      return {
        loading: true,
        data: [],
        errorMessage: null,
      };

    case ACTIONS.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ACTIONS.GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export const productDetailReducer = (
  state = initialState.productDetail,
  action
) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCT_DETAIL:
      return {
        loading: true,
        data: [],
        errorMessage: null,
      };

    case ACTIONS.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ACTIONS.GET_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
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
  productListReducer,
  productDetailReducer,
  cartReducer,
});

export default rootReducer;
