import axios from 'axios';
import { BASE_URL, PRODUCTS_PATH } from '../constant';

const getProductList = async () => {
  const response = await axios.get(`${BASE_URL}${PRODUCTS_PATH}`);
  const productList = response.data;
  return productList;
};

const getProductItem = async (id) => {
  const response = await axios.get(`${BASE_URL}${PRODUCTS_PATH}/${id}`);
  const productItem = response.data;
  return productItem;
};

export { getProductList, getProductItem };
