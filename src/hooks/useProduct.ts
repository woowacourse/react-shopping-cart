import { useCallback, useState } from 'react';
import mockApi from '../api/mockApi';
import type { ProductItem } from '../types/types';

function useProduct() {
  const [productList, setProductList] = useState<ProductItem[]>([]);

  const loadProductList = useCallback(async () => {
    const result = await mockApi('/products');
    const productList = JSON.parse(result.data);
    setProductList(productList);
  }, []);

  return {
    productList,
    loadProductList,
  };
}

export default useProduct;
