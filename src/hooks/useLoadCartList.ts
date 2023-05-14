import { useCallback } from 'react';
import mockApi from '../api/mockApi';
import safeJsonParse from '../utils/safeJsonParse';
import * as T from '../types/ProductType';
import useSetCartList from './useSetCartList';

const useLoadCartList = () => {
  const setCartList = useSetCartList();

  const loadCartList = useCallback(async () => {
    const response = await mockApi('/cart-items');

    setCartList(safeJsonParse<T.CartProduct[]>(response.data) ?? []);
  }, [setCartList]);

  return { loadCartList };
};

export default useLoadCartList;
