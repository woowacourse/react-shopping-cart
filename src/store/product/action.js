import { fetchFailed, fetchStarted, fetchSucceeded } from '../global/action';
import { getProductList } from '../../api/api';

export const fetchProductListAsync = page => async dispatch => {
  const stateName = 'PRODUCT_LIST';
  dispatch(fetchStarted(stateName));
  try {
    const { productList, totalProductCount } = await getProductList(page);
    dispatch(fetchSucceeded(stateName, { productList, totalProductCount }));
  } catch ({ message }) {
    dispatch(fetchFailed(stateName, { message }));
  }
};
