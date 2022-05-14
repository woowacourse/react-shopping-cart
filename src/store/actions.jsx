import { getProductList } from './api';
import { actionTypes } from './actionTypes';

const getProductListAsync = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      payload: await getProductList(),
    });
  } catch (err) {
    console.log('err', err);
  }
};

export { getProductListAsync };
