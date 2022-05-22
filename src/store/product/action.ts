import { getProductList } from '@/api/product';
import { ProductType } from '@/domain/product';
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
    productList: ProductType[];
    totalProductCount: number;
  };
}

interface GetProductListFailed {
  type: ProductActionType.GET_PRODUCT_LIST_FAILED;
  payload: {
    message: string | unknown;
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
      const {
        data: { productList, totalProductCount },
      } = await getProductList(page);
      dispatch({
        type: ProductActionType.GET_PRODUCT_LIST_SUCCEEDED,
        payload: {
          productList,
          totalProductCount,
        },
      });
    } catch ({ message }) {
      dispatch({
        type: ProductActionType.GET_PRODUCT_LIST_FAILED,
        payload: {
          message,
        },
      });
    }
  };
