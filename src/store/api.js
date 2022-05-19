import axios from 'axios';
import { PRODUCTS_PATH } from '../constant';

const getProductList = async () => {
  const response = await axios.get(PRODUCTS_PATH);
  const productList = response.data;
  return productList;
};

const getProductItem = async (id) => {
  const response = await axios.get(`${PRODUCTS_PATH}/${id}`);
  const productItem = response.data;
  return productItem;
};

export { getProductList, getProductItem };
