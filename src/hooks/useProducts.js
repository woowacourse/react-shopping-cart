import { getProductsAsync } from 'reducers/products/products.thunks';
import { useEffect } from 'react';
import useReduxState from './useReduxState';

const useProducts = () => {
  const {
    dispatch,
    state: { isLoading, isSucceed, isError, data },
  } = useReduxState('products');

  useEffect(() => {
    if (data.length > 0) return;
    if (isSucceed) return;
    dispatch(getProductsAsync);
  }, [data, isSucceed]);

  return { isLoading, isSucceed, isError, products: data };
};

export default useProducts;
