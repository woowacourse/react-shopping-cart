import { useEffect } from 'react';
import useReduxState from 'hooks/useReduxState';
import { getProductsAsync } from 'reducers/products/products.thunks';

const useProducts = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('products');

  const isEmpty = !isLoading && data.length === 0;

  const getProductsEffect = () => {
    useEffect(() => {
      if (data.length > 0) return;
      dispatch(getProductsAsync);
    }, [data]);
  };

  return { getProductsEffect, products: data, isLoading, isError, isEmpty };
};

export default useProducts;
