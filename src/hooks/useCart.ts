import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../states';
import { getCart } from '../states/actions/cart';
import {
  addCartItem as _addCartItem,
  deleteCartItem as _deleteCartItem,
  changeCartItemQuantity as _changeCartItemQuantity,
} from './../states/actions/cart';

const useCart = () => {
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length !== 0) return;

    dispatch(getCart());
  }, [dispatch]);

  const addCartItem = (product: Product) => {
    dispatch(_addCartItem(product));
  };

  const deleteCartItem = (cartItem: CartItem) => {
    dispatch(_deleteCartItem(cartItem));
  };

  const changeCartItemQuantity = (productId: CartItem['productId'], quantity: string) => {
    dispatch(_changeCartItemQuantity(productId, quantity));
  };

  return { cart, addCartItem, deleteCartItem, changeCartItemQuantity, loading, error };
};

export default useCart;
