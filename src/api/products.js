import axios from 'axios';

const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';

export const getProducts = async () => {
  // const response = await axios.get('/products');
  // const response = await axios.get('http://localhost:5000/products');
  const response = await axios.get(`${BASE_URL}/products`);

  return response.data;
};

export const getSingleProduct = async (productId) => {
  // const response = await axios.get('http://localhost:5000/products');
  const response = await axios.get(`${BASE_URL}/products/${productId}`);

  return response.data;
};
