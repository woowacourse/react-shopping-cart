import { useCallback } from 'react';

import * as T from '../types/ProductType';
import useSetProductList from './useSetProductList';
import mockApi from '../api/mockApi';
import safeJsonParse from '../utils/safeJsonParse';

const useLoadProductList = () => {
  const setProductList = useSetProductList();

  const loadProductList = useCallback(async () => {
    const response = await mockApi('/products');

    setProductList(safeJsonParse<T.ProductItem[]>(response.data) ?? []);
  }, [setProductList]);

  return { loadProductList };
};

export default useLoadProductList;
