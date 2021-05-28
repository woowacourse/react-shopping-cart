import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from './actions';
import { ProductsAction, ProductsState } from './type';

const initialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
};

export const productsReducer = (state: ProductsState = initialState, action: ProductsAction): ProductsState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
