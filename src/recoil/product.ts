import { selector, useRecoilValue } from 'recoil';
import { fetchProductData } from '../apis/products';

const productSelector = selector({
  key: 'productList',
  get: () => {
    return fetchProductData();
  },
});

export const useProductListReadOnly = () => useRecoilValue(productSelector);
