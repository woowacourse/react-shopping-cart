import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
} from 'store/productList/actionTypes';
import {
  getProductListSuccess,
  getProductListError,
  getProductList,
} from 'store/productList/actions';
import { ProductData } from 'types';

export interface ProductListState {
  productList: ProductData[];
  isLoading: boolean;
  isError: boolean;
}

export type ProductListAction =
  | ReturnType<typeof getProductList>
  | ReturnType<typeof getProductListSuccess>
  | ReturnType<typeof getProductListError>;

const initialState: ProductListState = {
  productList: [],
  isLoading: false,
  isError: false,
};

const productList = (state: ProductListState = initialState, action: ProductListAction) => {
  if (action.type === GET_PRODUCT_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_PRODUCT_LIST_SUCCESS) {
    return {
      ...state,
      productList: action.payload.productList,
      isLoading: false,
      isError: false,
    };
  }

  if (action.type === GET_PRODUCT_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  return state;
};

export default productList;
