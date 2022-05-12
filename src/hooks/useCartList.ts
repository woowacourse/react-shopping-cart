import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { postCartItem, putCartItem, getCartList } from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartListAction } from 'redux/actions/cartList';

const useCartList = () => {
  const dispatch = useAppDispatch<CartListAction>();
  const { data: cartList, error, loading } = useAppSelector(state => state.cartListReducer);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const updateCartItemQuantity = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    if (!targetItem) {
      dispatch(postCartItem({ id, quantity: 1 }));

      return;
    }
    dispatch(putCartItem({ ...targetItem, quantity: targetItem.quantity + 1 }));
  };

  return { cartList, error, loading, updateCartItemQuantity };
};

export default useCartList;
