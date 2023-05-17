import type { CartItemType } from '../types';

import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/state';

interface NewCartItemType extends CartItemType {
  quantity: 1;
}

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);

  const addCartItem = (cartItem: NewCartItemType) => {
    setCart([...cart, cartItem]);
  };

  const removeCartItem = (productId: number) => {
    setCart(cart.filter((order) => order.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const cartItemIndex = cart.findIndex((order) => order.product.id === productId);
    setCart(cart.toSpliced(cartItemIndex, 1, { ...cart[cartItemIndex], quantity }));
  };

  return [cart, { addCartItem, removeCartItem, updateQuantity }] as const;
}
