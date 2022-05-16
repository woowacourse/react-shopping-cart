import axios from 'axios';
import { getProductSuccess, getProductFail } from 'modules/product';

export const getProductList = () => async (storeDispatch) => {
  try {
    const response = await axios.get('/mocking/products');
    const products = await response.data;

    storeDispatch(getProductSuccess(products));
  } catch (error) {
    storeDispatch(getProductFail());
  }
};
