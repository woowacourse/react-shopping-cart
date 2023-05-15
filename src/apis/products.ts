import { AxiosError } from 'axios';
import { Product } from '../types/products';
import { client } from './index';

interface fetchProductDataRes extends AxiosError {
  items: Product[];
}

export const fetchProductData = async (): Promise<fetchProductDataRes> => {
  try {
    const res = await client('/data/mockProducts.json');
    return res.data;
  } catch {
    throw new Error('상품 목록을 찾아오지 못했습니다.');
  }
};
