import type { CartItemType } from '../types';
import { useRecoilState } from 'recoil';
import { cartState, selectedCartState } from '../recoil/state';

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedCart, setSelectedCart] = useRecoilState(selectedCartState);

  const addCartItem = (cartItem: CartItemType) => {
    setCart([...cart, cartItem]);
  };

  const removeCartItem = (productId: number) => {
    setSelectedCart(selectedCart.filter((id) => id !== productId));
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const orderIndex = cart.findIndex((order) => order.product.id === productId);
    const newCart = [...cart];
    newCart.splice(orderIndex, 1, { ...cart[orderIndex], quantity });

    setCart(newCart);
  };

  return [cart, addCartItem, removeCartItem, updateQuantity] as const;
}
