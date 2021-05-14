import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('http://localhost:4123/products');
  return response.data;
};
