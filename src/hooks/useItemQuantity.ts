import { cartItemsState } from '../recoil/selectors';
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
    const targetItem = nextCartItems.find((item) => item.id === id);
    if (targetItem === undefined) return;
    await updateCartItemQuantity(id, targetItem.quantity + 1);
    targetItem.quantity++;
    setCartItems(nextCartItems);
  };

  const decreaseQuantity = async (id: number) => {
    const nextCartItems = [...cartItems];
    const targetItem = nextCartItems.find((item) => item.id === id);
    if (targetItem === undefined) return;
    const nextTargetQuantity = Math.max(0, targetItem.quantity - 1);
    await updateCartItemQuantity(id, nextTargetQuantity);
    targetItem.quantity = nextTargetQuantity;
    setCartItems(nextCartItems);
  };

  return { getQuantity, increaseQuantity, decreaseQuantity };
}
