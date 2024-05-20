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
    await updateCartItemQuantity(id, nextCartItems[targetIndex].quantity + 1).catch(() => {
      alert('네트워크 접속이 불안정합니다. 다시 시도해주세요');
      setCartItems(cartItems);
    });
  };

  const decreaseQuantity = async (id: number) => {
    const nextCartItems = [...cartItems];
    const targetIndex = nextCartItems.findIndex((item) => item.id === id);
    if (targetIndex === -1) return;
    if (cartItems[targetIndex].quantity === 1) return;
    const nextTargetQuantity = cartItems[targetIndex].quantity - 1;
    nextCartItems[targetIndex] = {
      ...nextCartItems[targetIndex],
      quantity: nextTargetQuantity,
    };
    setCartItems(nextCartItems);
    await updateCartItemQuantity(id, nextTargetQuantity).catch(() => {
      alert('네트워크 접속이 불안정합니다. 다시시도해주세요');
      setCartItems(cartItems);
    });
  };

  return { getQuantity, increaseQuantity, decreaseQuantity };
}
