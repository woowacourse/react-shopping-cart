import { AxiosError } from 'axios';
import { LOADING, LOADING_SUCCESS, LOADING_FAILURE, ProductsAction } from '../actionTypes/products';

export interface productState {
  loading: boolean;
  loadingError: AxiosError | null;
  products: Product[];
}

const initialState: productState = {
  loading: false,
  loadingError: null,
  products: [],
};

export const productReducer = (state: productState = initialState, action: ProductsAction): productState => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        loadingError: null,
      };
    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        loadingError: action.loadingError,
      };
    default:
      return state;
  }
};
