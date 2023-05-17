import { useCallback } from 'react';

import * as T from '../types/ProductType';
import useSetCartList from './useSetCartList';
import mockApi from '../api/mockApi';
import safeJsonParse from '../utils/safeJsonParse';

const useLoadCartList = () => {
  const setCartList = useSetCartList();

  const loadCartList = useCallback(async () => {
    const response = await mockApi('/cart-items');

    setCartList(safeJsonParse<T.CartItem[]>(response.data) ?? []);
  }, [setCartList]);

  return { loadCartList };
};

export default useLoadCartList;
