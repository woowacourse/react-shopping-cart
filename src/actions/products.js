import { requestGetProductList } from 'api';
import { PRODUCTS_ACTIONS } from './types';

const getProductList = () => async (dispatch) => {
  const products = await requestGetProductList();

  // 오류 처리 구현하기.

  dispatch({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST,
    payload: products.content,
  });
};

export { getProductList };
