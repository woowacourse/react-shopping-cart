import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('http://localhost:4000/products');
  return response.data;
};
