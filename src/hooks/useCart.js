import useReduxState from './useReduxState';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { useEffect } from 'react';
import {
  deleteCartItemAsync,
  updateCartItemQuantityAsync,
} from 'reducers/cart/cart.thunk';

const useCart = () => {
  const {
    dispatch,
    state: { isLoadingGetCart, isErrorGetCart, data },
  } = useReduxState('cart');

  useEffect(() => {
    dispatch(getCartItemAsync);
  }, []);

  const handleUpdateItemQuantity = (id) => (quantity) => {
    dispatch(updateCartItemQuantityAsync(id, quantity));
  };
  const handleDeleteItem = (id) => () => {
    dispatch(deleteCartItemAsync(id));
  };

  return {
    isLoading: isLoadingGetCart,
    isError: isErrorGetCart,
    data,
    handleDeleteItem,
    handleUpdateItemQuantity,
  };
};

export default useCart;
