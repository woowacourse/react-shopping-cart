import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const initialState = {
  productList: {
    loading: true,
    data: null,
    errorMessage: null,
  },
  productDetail: {
    loading: true,
    data: null,
    errorMessage: null,
  },
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCT_LIST:
      return {
        ...state,
        productList: {
          loading: true,
          data: null,
          errorMessage: null,
        },
      };

    case ACTIONS.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          data: action.payload,
          errorMessage: null,
        },
      };

    case ACTIONS.GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        productList: {
          loading: false,
          data: null,
          errorMessage: action.payload,
        },
      };

    default:
      return state;
  }
};

export const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: {
          loading: true,
          data: null,
          errorMessage: null,
        },
      };

    case ACTIONS.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: {
          loading: false,
          data: action.payload,
          errorMessage: null,
        },
      };

    case ACTIONS.GET_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        productDetail: {
          loading: false,
          data: null,
          errorMessage: action.payload,
        },
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productListReducer,
  productDetailReducer,
});

export default rootReducer;
