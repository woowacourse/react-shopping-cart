import axios from 'axios';

export const getProducts = async () => {
  // const response = await axios.get('/products');
  // const response = await axios.get('http://localhost:5000/products');
  const response = await axios.get('https://shopping-cart.techcourse.co.kr/api/products');

  return response.data;
};

export const getSingleProduct = async (productId) => {
  const response = await axios.get('http://localhost:5000/products');

  return response.data.find((item) => item.id === productId);
};
