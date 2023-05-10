import axios, { AxiosResponse } from 'axios';
import { selector } from 'recoil';
import { Product } from '../types/products';

export const products = selector({
  key: 'products',
  get: async (): Promise<AxiosResponse<{ items: Product[] }>> => {
    const products = await axios('./data/mockProducts.json');

    return products;
  },
});
