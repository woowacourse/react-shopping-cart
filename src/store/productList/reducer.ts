import { START_PRODUCT_LIST, SET_PRODUCT_LIST } from 'store/productList/actionTypes';
import { startProductList, setProductList } from 'store/productList/actions';
import { ProductData } from 'types';

interface ProductListState {
  productList: ProductData[];
  isLoading: boolean;
  isLoaded: boolean;
}

type ProductListAction = ReturnType<typeof startProductList> | ReturnType<typeof setProductList>;

const initialState: ProductListState = {
  productList: [],
  isLoading: false,
  isLoaded: false,
};

const productList = (state: ProductListState = initialState, action: ProductListAction) => {
  if (action.type === START_PRODUCT_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_PRODUCT_LIST) {
    return {
      ...state,
      productList: action.payload.productList,
      isLoading: false,
      isLoaded: true,
    };
  }
  return state;
};

export default productList;
