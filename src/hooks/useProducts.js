import { useEffect } from 'react';
import useReduxState from 'hooks/useReduxState';
import { getProductsAsync } from 'reducers/products/products.thunks';

const useProducts = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('products');

  const isEmpty = !isLoading && data.length === 0;

  useEffect(() => {
    if (data.length > 0) return;
    dispatch(getProductsAsync);
  }, [data]);

  return { isLoading, products: data, isError, isEmpty };
};

export default useProducts;
