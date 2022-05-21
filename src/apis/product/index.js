import axios from 'axios';

import {
  getProductSuccess,
  getProductFail,
  getDetailProductSuccess,
  getDetailProductFail,
} from 'modules/product';

export const getProductList = () => async (dispatch) => {
  try {
    const response = await axios.get('/mocking/products');
    const products = await response.data;

    dispatch(getProductSuccess(products));
  } catch (error) {
    dispatch(getProductFail(error));
  }
};

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/mocking/products/${id}`);
    const detailProduct = await response.data;

    dispatch(getDetailProductSuccess(detailProduct));
  } catch (error) {
    dispatch(getDetailProductFail(error));
  }
};
