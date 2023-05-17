import { useCallback } from 'react';

import useSetProductList from './useSetProductList';

const useLoadProductList = () => {
  const setProductList = useSetProductList();

  const loadProductList = useCallback(async () => {
    const response = await fetch('/products');
    const productList = await response.json();

    setProductList(productList);
  }, [setProductList]);

  return { loadProductList };
};

export default useLoadProductList;
