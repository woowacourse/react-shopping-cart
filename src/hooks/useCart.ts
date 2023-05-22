import type { CartItemType } from '../types';
import { useRecoilState } from 'recoil';
import { cartState, selectedCartState } from '../recoil/state';
import { createCartItem, deleteCartItem, updateCartItemQuantity } from '../api/cart';

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedCart, setSelectedCart] = useRecoilState(selectedCartState);

  const addCartItem = async (productId: number) => {
    const newCartItem = await createCartItem(productId);
    setCart([...cart, newCartItem]);
  };

  const removeCartItem = (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem) {
      deleteCartItem(cartItem.id);

      setSelectedCart(selectedCart.filter((id) => id !== productId));
      setCart(cart.filter((item) => item.id !== cartItem.id));
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const orderIndex = cart.findIndex((order) => order.product.id === productId);
    updateCartItemQuantity(cart[orderIndex].id, quantity);

    const newCart = [...cart];
    newCart.splice(orderIndex, 1, { ...cart[orderIndex], quantity });
    setCart(newCart);
  };

  return [cart, addCartItem, removeCartItem, updateQuantity] as const;
}
