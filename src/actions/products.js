import { requestGetProductList } from 'api';
import { REQUEST_STATUS } from 'constants/';
import { PRODUCTS_ACTIONS } from './types';

const getProductList = () => async (dispatch) => {
  const response = await requestGetProductList();

  if (response.status === REQUEST_STATUS.FAIL) {
    dispatch({
      type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_FAILURE,
      payload: response.content,
    });

    return;
  }

  dispatch({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS,
    payload: response.content,
  });
};

export { getProductList };
