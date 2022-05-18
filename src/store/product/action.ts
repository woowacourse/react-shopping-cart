import { getProductList } from '@/api/api';
import { Product } from '@/domain/product';
import { Dispatch } from 'redux';
export const enum ProductActionType {
  GET_PRODUCT_LIST_START = 'product/GET_PRODUCT_LIST_START',
  GET_PRODUCT_LIST_SUCCEEDED = 'product/GET_PRODUCT_LIST_SUCCEEDED',
  GET_PRODUCT_LIST_FAILED = 'product/GET_PRODUCT_LIST_FAILED',
}

interface GetProductListStart {
  type: ProductActionType.GET_PRODUCT_LIST_START;
}

interface GetProductListSucceeded {
  type: ProductActionType.GET_PRODUCT_LIST_SUCCEEDED;
  payload: {
    productList: Product[];
    totalProductCount: number;
  };
}

interface GetProductListFailed {
  type: ProductActionType.GET_PRODUCT_LIST_SUCCEEDED;
  payload: {
    message: string;
  };
}

export type ProductListAction =
  | GetProductListStart
  | GetProductListSucceeded
  | GetProductListFailed;

export const fetchProductListAsync =
  (page: number) => async (dispatch: Dispatch<ProductListAction>) => {
    dispatch({ type: ProductActionType.GET_PRODUCT_LIST_START });
    try {
      const { productList, totalProductCount } = await getProductList(page);
      dispatch({
        type: ProductActionType.GET_PRODUCT_LIST_SUCCEEDED,
        payload: {
          productList,
          totalProductCount,
        },
      });
    } catch ({ message }) {
      dispatch({
        type: ProductActionType.GET_PRODUCT_LIST_SUCCEEDED,
        payload: {
          message,
        },
      });
    }
  };
