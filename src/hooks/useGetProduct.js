import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useReduxState from 'hooks/shared/useReduxState';
import { getProductAsync } from 'reducers/product/product.thunks';

const useGetProduct = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  return {
    product: data,
    isProductLoading: isLoading,
    isProductError: isError,
  };
};

export default useGetProduct;
