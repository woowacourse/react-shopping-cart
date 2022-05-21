import useReduxState from 'hooks/useReduxState';
import { getCartAsync } from 'reducers/cart/cart.thunks';
import { useEffect } from 'react';

const useCart = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('cart');

  useEffect(() => {
    dispatch(getCartAsync);
  }, []);

  return { cartList: data, isLoading, isError };
};

export default useCart;
