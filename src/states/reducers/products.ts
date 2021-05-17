import { AxiosError } from 'axios';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  ProductsAction,
} from '../constants/actionTypes';

export interface productState {
  loading: boolean;
  error: AxiosError | null;
  products: Product[];
}

const initialState: productState = {
  loading: false,
  error: null,
  products: [],
};

export const productReducer = (state: productState = initialState, action: ProductsAction): productState => {
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
