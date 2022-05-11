import axios from 'axios';

const getProductList = async () => {
  const response = await axios.get('http://localhost:4000/products');
  const productList = response.data;
  return productList;
};

export { getProductList };
