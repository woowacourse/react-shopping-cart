import { getProductList } from '../../api/api';
import { fetchFailed, fetchStarted, fetchSucceeded } from './global';

export const fetchProductListAsync = () => async dispatch => {
  const stateName = 'PRODUCT_LIST';
  dispatch(fetchStarted(stateName));
  try {
    const data = await getProductList();
    dispatch(fetchSucceeded(stateName, { productList: data }));
  } catch ({ message }) {
    dispatch(fetchFailed(stateName, { message }));
  }
};
