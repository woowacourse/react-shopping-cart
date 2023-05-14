import { useSetRecoilState } from 'recoil';
import cartListState from '../recoil/cartListState';
import { useCallback } from 'react';
import mockApi from '../api/mockApi';
import safeJsonParse from '../utils/safeJsonParse';
import * as T from '../types/ProductType';

const useLoadCartList = () => {
  const setCartList = useSetRecoilState(cartListState);

  const loadCartList = useCallback(async () => {
    const response = await mockApi('/cart-items');

    setCartList(safeJsonParse<T.CartProduct[]>(response.data) ?? []);
  }, [setCartList]);

  return { loadCartList };
};

export default useLoadCartList;
