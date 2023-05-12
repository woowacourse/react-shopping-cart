import { useEffect, useState } from 'react';
import type { Product } from '../../types/product';

const useFetchProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductList = async () => {
      const response = await fetch('./mockData.json');

      if (!response.ok) {
        throw new Error('상품 목록을 불러올 수 없습니다.');
      }

      const mockData = await response.json();

      setProductList(mockData.products);
    };

    fetchProductList();
  }, []);

  return productList;
};

export default useFetchProductList;
