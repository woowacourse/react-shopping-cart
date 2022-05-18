import { getProductsAsync } from 'reducers/products/products.thunks';
import { useEffect } from 'react';
import useReduxState from './useReduxState';

const useProducts = () => {
  const {
    dispatch,
    state: { isLoading, isError, data },
  } = useReduxState('products');

  useEffect(() => {
    dispatch(getProductsAsync); // 이 부분 수정하기. 상태있을 경우 안가져오게..
  }, []);

  return { isLoading, isError, products: data };
};

export default useProducts;
