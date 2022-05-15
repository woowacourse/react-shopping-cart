import { requestGetProductList } from 'api/products';
import { createRequestState } from 'lib/requestUtils';
import { PRODUCTS_ACTIONS } from './types';

const getProductList = () => async (dispatch) => {
  await requestGetProductList(1)({
    PENDING: () =>
      dispatch({
        type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST,
        payload: createRequestState.loading(),
      }),

    SUCCESS: (result) =>
      dispatch({
        type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS,
        payload: createRequestState.success(result),
      }),

    ERROR: (result) =>
      dispatch({
        type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR,
        payload: createRequestState.error(result),
      }),
  });
};

export { getProductList };
