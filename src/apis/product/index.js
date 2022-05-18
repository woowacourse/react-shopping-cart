import axios from 'axios';
import { getProductSuccess, getProductFail } from 'modules/product';

export const getProductList = () => async (dispatch) => {
  try {
    const response = await axios.get('/mocking/products');
    const products = await response.data;

    dispatch(getProductSuccess(products));
  } catch (error) {
    dispatch(getProductFail());
  }
};
