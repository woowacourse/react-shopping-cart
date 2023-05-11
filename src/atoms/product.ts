import { selector } from 'recoil';
import { MOCK_API_URL } from '../constant';
import { Product } from '../types/product';

export const fetchProductSelector = selector({
  key: 'FetchProductSelector',
  get: async () => {
    const response = await fetch(MOCK_API_URL);

    if (!response.ok) throw new Error('foo');

    const products = await response.json();

    return products as Product[];
  },
});
