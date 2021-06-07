import { useEffect } from 'react';
import { ERROR } from '../../constants/error';
import { thunkGetCartItems } from '../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../states/store';

const useCartItems = () => {
  const dispatch = useAppDispatch();
  const [
    cartItems,
    hasError,
    isLoading,
  ] = useAppSelector(({ cart: { items, error, isLoading } }) => [items, error, isLoading]);

  useEffect(() => {
    if (!hasError) return;

    throw new Error(ERROR.NETWORK);
  }, [hasError]);

  const loadCartItems = () => {
    dispatch(thunkGetCartItems());
  };

  return { cartItems, hasError, isLoading, loadCartItems };
};

export default useCartItems;
