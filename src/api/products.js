import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('https://shopping-cart-tyhe.herokuapp.com/api/products');
  return response.data;
};
