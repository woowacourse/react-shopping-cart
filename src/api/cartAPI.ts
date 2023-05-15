import { fetchAPI } from './fetchAPI';

const getCartList = async () => {
  return await fetchAPI('/api/carts');
};

export { getCartList };
