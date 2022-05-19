import { getProductAsync } from 'reducers/product/product.thunks';
import { useParams } from 'react-router-dom';
import { addCartItemRequest } from 'reducers/cart/cart.actions';
import { useEffect } from 'react';
import useReduxState from 'hooks/useReduxState';

const useProduct = () => {
  const { id } = useParams();
  const {
    dispatch,
    state: { isLoading, isError, data },
  } = useReduxState('product');

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  const handleAddCart = () => {
    dispatch(addCartItemRequest({ ...data, quantity: 1 }));
  };

  return { isLoading, isError, product: data, handleAddCart };
};

export default useProduct;
