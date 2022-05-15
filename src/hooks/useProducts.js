import { getProductsAsync } from 'reducers/products/products.thunks';
import { useEffect } from 'react';
import useReduxState from './useReduxState';

const useProducts = () => {
  const { dispatch, isLoading, isError, data } = useReduxState('products');

  useEffect(() => {
    if (data.length > 0) return;
    dispatch(getProductsAsync);
  }, [data]);

  return { isLoading, isError, products: data };
};

export default useProducts;
