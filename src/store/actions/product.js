import { getProductList } from 'api/api';
import { productActionTypes } from 'store/reducers/product';

export const fetchProductListAsync = (page) => async (dispatch) => {
  dispatch({ type: productActionTypes.START });
  try {
    const { productList, totalProductCount } = await getProductList(page);
    dispatch({ type: productActionTypes.LIST_FETCH, payload: { productList, totalProductCount } });
  } catch ({ message }) {
    alert(message);

    dispatch({ type: productActionTypes.FAIL });
  }
};
