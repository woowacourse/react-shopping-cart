import axios from 'axios';
import { PRODUCTS_PATH } from '../../constant';

const actionTypes = {
  SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
};

const getProductListAsync = () => async (dispatch) => {
  try {
    const { data } = await axios.get(PRODUCTS_PATH);

    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { getProductListAsync, actionTypes };
