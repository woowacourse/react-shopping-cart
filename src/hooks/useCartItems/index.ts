import { useEffect } from 'react';
import { ERROR } from '../../constants/error';
import { thunkGetCartItems } from '../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../states/store';
import CustomError from '../../utils/CustomError';

const useCartItems = () => {
  const dispatch = useAppDispatch();
  const [cartItems, error, isLoading] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  useEffect(() => {
    if (!error) return;

    throw new CustomError(ERROR.NETWORK, error.message);
  }, [error]);

  const loadCartItems = () => {
    dispatch(thunkGetCartItems());
  };

  return { cartItems, error, isLoading, loadCartItems };
};

export default useCartItems;
