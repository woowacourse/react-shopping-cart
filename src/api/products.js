import axios from 'axios';

const port = process.env.PORT || 4000;

export const getProducts = async () => {
  const response = await axios.get(`http://localhost:${port}/products`);
  return response.data;
};
