import axios from 'axios';
import { SERVER_PATH } from '../../constant';

const actionTypes = {
  SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
};

const getProductListAsync = () => async (dispatch) => {
  try {
    const { data } = await axios.get(SERVER_PATH.PRODUCTS);

    dispatch({
      type: actionTypes.SET_PRODUCT_LIST,
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { getProductListAsync, actionTypes };
