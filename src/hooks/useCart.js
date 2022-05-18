import useReduxState from './useReduxState';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { useEffect } from 'react';

const useCart = () => {
  const {
    dispatch,
    state: { isLoadingGetCart, isErrorGetCart, data },
  } = useReduxState('cart');

  useEffect(() => {
    dispatch(getCartItemAsync);
  }, []);

  return { isLoading: isLoadingGetCart, isError: isErrorGetCart, data };
};

export default useCart;
