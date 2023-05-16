import { Product } from '../types/products';

interface fetchProductDataRes {
  items: Product[];
}

export const fetchProductData = async (): Promise<fetchProductDataRes> => {
  try {
    const res = await fetch('/data/mockProducts.json');
    const data = res.json();
    return data;
  } catch {
    throw new Error('상품 목록을 찾아오지 못했습니다.');
  }
};
