import { useCallback } from 'react';
import mockApi from '../api/mockApi';

import safeJsonParse from '../utils/safeJsonParse';
import { useSetRecoilState } from 'recoil';
import productListState from '../recoil/productListState';
import * as T from '../types/ProductType';

const useLoadProductList = () => {
  const setProductList = useSetRecoilState(productListState);

  const loadProductList = useCallback(async () => {
    const response = await mockApi('/products');

    setProductList(safeJsonParse<T.ProductItem[]>(response.data) ?? []);
  }, [setProductList]);

  return { loadProductList };
};

export default useLoadProductList;
