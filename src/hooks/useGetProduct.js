import useReduxState from 'hooks/shared/useReduxState';
import { getProductAsync } from 'reducers/product/product.thunks';

const useGetProduct = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');

  const getProduct = async (id) => {
    dispatch(getProductAsync(id));
  };

  return {
    getProduct,
    product: data,
    isProductLoading: isLoading,
    isProductError: isError,
  };
};

export default useGetProduct;
