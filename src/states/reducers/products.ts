import { AxiosError } from 'axios';
import { REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, ProductsAction } from '../actionTypes/products';

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
    case REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
