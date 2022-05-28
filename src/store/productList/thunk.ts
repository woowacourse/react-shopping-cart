import { Dispatch } from 'redux';

import {
  getProductList,
  getProductListError,
  getProductListSuccess,
} from 'store/productList/actions';
import { ProductListAction } from 'store/productList/reducer';
import { loadProductList } from 'api/product';

export const getProductListAsync = () => async (dispatch: Dispatch<ProductListAction>) => {
  dispatch(getProductList());

  try {
    const response = await loadProductList();
    dispatch(getProductListSuccess(response));
  } catch (e) {
    dispatch(getProductListError());
  }
};
