import { getProductList } from '../../api';
import { actionTypes } from '../actionTypes';

const getProductListAsync = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      payload: await getProductList(),
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { getProductListAsync };
