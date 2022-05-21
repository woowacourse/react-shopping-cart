import { useEffect } from 'react';
import useReduxState from 'hooks/shared/useReduxState';
import { getProductListAsync } from 'reducers/productList/productList.thunks';

const useGetProductList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('productList');

  const isEmpty = !isLoading && data.length === 0;

  useEffect(() => {
    if (data.length > 0) return;
    dispatch(getProductListAsync);
  }, [data]);

  return {
    productList: data,
    isProductListLoading: isLoading,
    isProductListError: isError,
    isProductListEmpty: isEmpty,
  };
};

export default useGetProductList;
