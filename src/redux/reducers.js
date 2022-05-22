import {
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
  ADD_PRODUCT_TO_CART,
} from "./types";

export const productListInitialState = {
  productList: {
    loading: false,
    data: null,
    error: null,
  },
};

export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_START:
      return {
        ...state,
        productList: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          data: JSON.parse(action.payload),
          error: null,
        },
      };

    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        productList: {
          loading: false,
          data: null,
          error: action.payload.message,
        },
      };

    default: {
      return state;
    }
  }
};

export const cartListInitialState = [];

export const cartListReducer = (state = cartListInitialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const isExistInCart = state.some((item) => {
        return item.id === action.payload.id;
      });

      if (isExistInCart) {
        return state;
      }
      return [...state, action.payload];

    default:
      return state;
  }
};
