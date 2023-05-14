import { useEffect } from 'react';

import useLoadProductList from './useLoadProductList';
import useLoadCartList from './useLoadCartList';

const useLoadInitData = () => {
  const { loadProductList } = useLoadProductList();
  const { loadCartList } = useLoadCartList();

  useEffect(() => {
    loadCartList();
  }, [loadCartList]);

  useEffect(() => {
    loadProductList();
  }, [loadProductList, loadCartList]);
};

export default useLoadInitData;
