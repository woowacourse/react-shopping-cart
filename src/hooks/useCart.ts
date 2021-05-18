import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states';
import { getCart } from '../states/actions/cart';
import { addCartItem as _addCartItem, deleteCartItem as _deleteCartItem } from './../states/actions/cart';

const useCart = () => {
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length !== 0) return;

    dispatch(getCart());
  }, [dispatch]);

  const addCartItem = (cartItem: CartItem) => {
    dispatch(_addCartItem(cartItem));
  };

  const deleteCartItem = (cartItem: CartItem) => {
    dispatch(_deleteCartItem(cartItem));
  };

  return { cart, addCartItem, deleteCartItem, loading, error };
};

export default useCart;
