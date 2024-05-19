import { cartItemsState } from '../recoil/atoms';
import { updateCartItemQuantity } from '../apis';
import { useRecoilState } from 'recoil';

export default function useItemQuantity() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const getQuantity = (id: number) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (cartItem === undefined) return 1;
    return cartItem.quantity;
  };

  const increaseQuantity = async (id: number) => {
    const nextCartItems = [...cartItems];
    const targetIndex = nextCartItems.findIndex((item) => item.id === id);
    if (targetIndex === -1) return;
    nextCartItems[targetIndex] = {
      ...nextCartItems[targetIndex],
      quantity: nextCartItems[targetIndex].quantity + 1,
    };
    setCartItems(nextCartItems);
    await updateCartItemQuantity(id, nextCartItems[targetIndex].quantity + 1);
  };

  const decreaseQuantity = async (id: number) => {
    const nextCartItems = [...cartItems];
    const targetItem = nextCartItems.find((item) => item.id === id);
    if (targetItem === undefined) return;
    const nextTargetQuantity = Math.max(0, targetItem.quantity - 1);
    targetItem.quantity = nextTargetQuantity;
    setCartItems(nextCartItems);
    await updateCartItemQuantity(id, nextTargetQuantity);
  };

  return { getQuantity, increaseQuantity, decreaseQuantity };
}
