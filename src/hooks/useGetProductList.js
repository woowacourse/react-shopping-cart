import useReduxState from 'hooks/shared/useReduxState';
import { getProductListAsync } from 'reducers/productList/productList.thunks';

const useGetProductList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('productList');

  const isEmpty = !isLoading && data.length === 0;

  const getProductList = () => {
    dispatch(getProductListAsync);
  };

  return {
    getProductList,
    productList: data,
    isProductListLoading: isLoading,
    isProductListError: isError,
    isProductListEmpty: isEmpty,
  };
};

export default useGetProductList;
