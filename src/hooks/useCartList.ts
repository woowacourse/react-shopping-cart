import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { getCartList, putCartItem } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';

import { useAppDispatch } from './useAppDispatch';

const useCartList = () => {
  const dispatch = useAppDispatch<CartListAction>();
  const { data: cartList, error, loading } = useAppSelector(state => state.cartListReducer);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const updateCartItemQuantity = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    dispatch(putCartItem({ ...targetItem, quantity: targetItem.quantity + 1 }));
  };

  return { cartList, error, loading, updateCartItemQuantity };
};

export default useCartList;
