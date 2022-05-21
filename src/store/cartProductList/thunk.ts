import { Dispatch } from 'redux';

import {
  getCartProductList,
  getCartProductListError,
  getCartProductListSuccess,
} from 'store/cartProductList/actions';
import { CartProductListAction } from 'store/cartProductList/reducer';

import { loadCartProductList } from 'api/cart';

export const getCartProductListAsync = () => async (dispatch: Dispatch<CartProductListAction>) => {
  try {
    const response = await loadCartProductList();
    dispatch(getCartProductListSuccess(response));
  } catch (e) {
    dispatch(getCartProductListError());
  }
};
