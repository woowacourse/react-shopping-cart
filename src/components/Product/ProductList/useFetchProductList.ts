import { useEffect, useState } from 'react';
import type { Product } from '../../../types/product';

const useFetchProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductList = async () => {
    const response = await fetch('./products');

    if (!response.ok) {
      throw new Error('상품 목록을 불러올 수 없습니다.');
    }

    const products = await response.json();
    setProductList(products);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return { productList, fetchProductList };
};

export default useFetchProductList;
