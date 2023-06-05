import { selector, useRecoilValue } from 'recoil';

import { fetchAPI } from '../api/fetchAPI';

import { ProductType } from '../types';

export const productsSelector = selector<ProductType[]>({
  key: 'productsRepository',
  get: async () => {
    const products = await fetchAPI('/products');
    console.log('products', products);
    return products;
  },
});

export const useFetchProducts = () => useRecoilValue(productsSelector);
