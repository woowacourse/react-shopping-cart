import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { getCartList, putCartItem } from 'redux/action-creators/cartListThunk';

const useCartList = () => {
  const dispatch = useDispatch();
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
