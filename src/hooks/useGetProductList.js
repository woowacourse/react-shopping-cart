import useReduxState from 'hooks/shared/useReduxState';
import { getProductListAsync } from 'reducers/productList/productList.thunks';

const useGetProductList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('productList');

  const getProductList = async () => {
    dispatch(getProductListAsync());
  };

  return {
    getProductList,
    productList: data,
    isProductListLoading: isLoading,
    isProductListError: isError,
  };
};

export default useGetProductList;
