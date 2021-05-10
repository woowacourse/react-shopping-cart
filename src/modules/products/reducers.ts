import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, ProductsAction } from './actions';
import * as T from '../../types';

export type ProductsState = {
  products: {
    isLoading: boolean;
    data: T.Product[];
    error: Error | null;
  };
};

const initialState: ProductsState = {
  products: {
    isLoading: false,
    data: [],
    error: null,
  },
};

export const productsReducer = (state: ProductsState = initialState, action: ProductsAction) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: true,
        },
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          data: action.products,
        },
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          error: action.error,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
