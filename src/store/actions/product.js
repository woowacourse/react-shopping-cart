import { getProductList } from '../../api/api';
import { actionFailed, actionStarted, actionSucceeded } from './global';

export const fetchProductListAsync = (page) => async (dispatch) => {
  const actionName = 'PRODUCT_LIST_FETCH';
  dispatch(actionStarted(actionName));
  try {
    const { productList, totalProductCount } = await getProductList(page);
    dispatch(actionSucceeded(actionName, { productList, totalProductCount }));
  } catch ({ message }) {
    dispatch(actionFailed(actionName, { message }));
  }
};
