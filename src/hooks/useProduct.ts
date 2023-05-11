import { useCallback, useState } from 'react';
import mockApi from '../api/mockApi';
import * as T from '../types/types';

function useProduct() {
  const [productList, setProductList] = useState<T.ProductItem[]>([]);

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
