import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useReduxState from 'hooks/useReduxState';
import { getProductAsync } from 'reducers/product/product.thunks';

const useProduct = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');

  const { id } = useParams();

  const getProductEffect = () => {
    useEffect(() => {
      dispatch(getProductAsync(id));
    }, [id]);
  };

  return { getProductEffect, product: data, isLoading, isError };
};

export default useProduct;
