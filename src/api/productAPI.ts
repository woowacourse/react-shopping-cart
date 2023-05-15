import { fetchAPI } from './fetchAPI';

const getProductList = async () => {
  return await fetchAPI('/api/products');
};

export { getProductList };
