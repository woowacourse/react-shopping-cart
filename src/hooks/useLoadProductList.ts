import { useCallback } from 'react';
import mockApi from '../api/mockApi';
import * as T from '../types/ProductType';
import safeJsonParse from '../utils/safeJsonParse';
import useSetProductList from './useSetProductList';

const useLoadProductList = () => {
  const setProductList = useSetProductList();

  const loadProductList = useCallback(async () => {
    const response = await mockApi('/products');

    setProductList(safeJsonParse<T.ProductItem[]>(response.data) ?? []);
  }, [setProductList]);

  return { loadProductList };
};

export default useLoadProductList;
