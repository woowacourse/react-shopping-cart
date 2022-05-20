import { API_URL, PRODUCT_LIST_PAGE_LIMIT } from '@/api/constants';
import axios from 'axios';

const productAPI = axios.create({
  baseURL: `${API_URL}/products`,
});

export const getProductList = async (page): Promise<any> => {
  const response = await productAPI.get('', {
    params: { _page: page, _limit: PRODUCT_LIST_PAGE_LIMIT },
  });

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { productList: response.data, totalProductCount: response.headers['x-total-count'] };
};
