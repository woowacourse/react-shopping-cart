import { getProductList } from '../api';
import { actionTypes } from './actionTypes';

const getProductListAsync = () => async (dispatch) => {
  try {
    const { data } = await getProductList();

    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      payload: data,
    });
  } catch (err) {
    console.log('err', err.message);
  }
};

export { getProductListAsync };
