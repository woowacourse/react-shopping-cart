import type { CartItemType } from '../types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/state';
import { LOCAL_STORAGE_KEY } from '../constants';

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);

  const addCartItem = (cartItem: CartItemType) => {
    setCart([...cart, cartItem]);
  };

  const removeCartItem = (productId: number) => {
    setCart(cart.filter((order) => order.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const orderIndex = cart.findIndex((order) => order.product.id === productId);
    const newCart = [...cart];
    newCart.splice(orderIndex, 1, { ...cart[orderIndex], quantity });

    setCart(newCart);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY.cart, JSON.stringify(cart));
  }, [cart]);

  return [cart, addCartItem, removeCartItem, updateQuantity] as const;
}
