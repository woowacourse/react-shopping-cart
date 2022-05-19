import useReduxState from './useReduxState';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { useEffect } from 'react';
import { updateCartItemQuantityAsync } from 'reducers/cart/cart.thunk';

const useCart = () => {
  const {
    dispatch,
    state: { isLoadingGetCart, isSucceedGetCart, isErrorGetCart, data },
  } = useReduxState('cart');

  useEffect(() => {
    if (data.length > 0) return;
    if (isSucceedGetCart) return;
    dispatch(getCartItemAsync);
  }, [isSucceedGetCart, data]);

  const handleUpdateItemQuantity = (id) => (quantity) => {
    dispatch(updateCartItemQuantityAsync(id, quantity));
  };

  return {
    isLoading: isLoadingGetCart,
    isError: isErrorGetCart,
    cartItems: data,
    handleUpdateItemQuantity,
  };
};

export default useCart;
