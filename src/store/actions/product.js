import { getProductList } from '../../api/api';
import { productActionTypes } from '../reducers/product';

export const fetchProductListAsync = (page) => async (dispatch) => {
  dispatch({ type: productActionTypes.START });
  try {
    const { productList, totalProductCount } = await getProductList(page);
    dispatch({ type: productActionTypes.LIST_FETCH, payload: { productList, totalProductCount } });
  } catch ({ message }) {
    dispatch({ type: productActionTypes.FAIL, payload: { message } });
  }
};
