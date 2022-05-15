import axios from 'axios';

const getProductList = async () => {
  const response = await axios.get('http://localhost:4000/products');
  const productList = response.data;
  return productList;
};

const getProductItem = async (id) => {
  const response = await axios.get(`http://localhost:4000/products/${id}`);
  const productItem = response.data;
  return productItem;
};

export { getProductList, getProductItem };
