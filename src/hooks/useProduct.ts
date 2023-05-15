import { useCallback, useState } from 'react';
import type { ProductItem } from '../types/types';
import mockData from '../assets/mockData.json';

function useProduct() {
  const [productList, setProductList] = useState<ProductItem[]>([]);

  const loadProductList = useCallback(async () => {
    // fetch('/products');
    setProductList(mockData);
  }, []);

  return {
    productList,
    loadProductList,
  };
}

export default useProduct;
