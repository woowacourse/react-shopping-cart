import { useRecoilState, useRecoilValue } from 'recoil';

import { cartItemFamily, cartItemsState } from '@/e_entities/cart';
import { fetchChangeCartItemsQuantity } from '@/f_shared';

import { useDeleteCartItem } from './delete';

type Type = 'increase' | 'decrease';

export const useUpdateCartQuantity = (cartItemId: CartItemId, type: Type) => {
  const cartItem = useRecoilValue(cartItemFamily(cartItemId));
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const deleteCartItem = useDeleteCartItem(cartItemId);

  const handleUpdateQuantity = async () => {
    if (type === 'decrease' && cartItem.quantity === 1) {
      await deleteCartItem();
      return;
    }

    const newQuantity = type === 'increase' ? cartItem.quantity + 1 : cartItem.quantity - 1;
    if (newQuantity < 1) return;

    await fetchChangeCartItemsQuantity(cartItemId, newQuantity);

    const updatedCartItems = cartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCartItems);
  };

  return handleUpdateQuantity;
};
