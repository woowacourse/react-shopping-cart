import axios from 'axios';

import { port } from '../../server/index';

export const getProducts = async () => {
  const response = await axios.get(`http://localhost:${port}/products`);
  return response.data;
};
