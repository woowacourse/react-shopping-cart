import axios from 'axios';

// eslint-disable-next-line no-undef
export const API_URL = process.env.REACT_APP_API_URL;

const productAPI = axios.create({
  baseURL: API_URL,
});

export const getProductList = async () => {
  const response = await productAPI.get('/products');

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return response.data;
};
