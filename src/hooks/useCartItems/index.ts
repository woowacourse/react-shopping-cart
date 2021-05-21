import { useEffect } from 'react';
import { NETWORK_ERROR } from '../../constants/error';
import { thunkGetCartItems } from '../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../states/store';

const useCartItems = () => {
  const dispatch = useAppDispatch();
  const [
    itemsInCart,
    hasError,
    isLoading,
  ] = useAppSelector(({ cart: { items, error, isLoading } }) => [items, error, isLoading]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(NETWORK_ERROR);
  }, [hasError]);

  const loadCartItems = () => {
    dispatch(thunkGetCartItems());
  };

  return { itemsInCart, hasError, isLoading, loadCartItems };
};

export default useCartItems;
