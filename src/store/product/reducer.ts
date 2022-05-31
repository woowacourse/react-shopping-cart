import { ProductType } from '@/domain/product';
import { ProductActionType } from '@/store/product/action';
import { PRODUCT_LIST_PAGE_LIMIT } from '../../api/constants';

export interface ProductState {
  readonly productList: ProductType[];
  readonly totalProductCount: number;
  readonly pageCount: number;
  readonly isLoading: boolean;
}

const initialState: ProductState = {
  productList: [],
  totalProductCount: 0,
  pageCount: 0,
  isLoading: false,
};

const productReducer = (state = initialState, action): ProductState => {
  switch (action.type) {
    case ProductActionType.GET_PRODUCT_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ProductActionType.GET_PRODUCT_LIST_SUCCEEDED: {
      const {
        payload: { productList, totalProductCount },
      } = action;
      return {
        ...state,
        productList,
        pageCount: Math.ceil(totalProductCount / PRODUCT_LIST_PAGE_LIMIT),
        isLoading: false,
      };
    }

    case ProductActionType.GET_PRODUCT_LIST_FAILED: {
      const {
        payload: { message },
      } = action;

      alert(message);

      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default productReducer;
