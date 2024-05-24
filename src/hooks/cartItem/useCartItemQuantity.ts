import { useRecoilState } from 'recoil';

import { cartItemListState } from '../../recoil/cartItem/atom';
import { requestSetCartItemQuantity } from '../../apis/cartItemList';

export const useCartItemQuantity = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);

  const cartItemQuantity = (cartItemId: number) => {
    return (
      cartItemList.find((cartItem) => cartItem.id === cartItemId)?.quantity ?? 0
    );
  };

  const increaseQuantity = async (cartItemId: number) => {
    const currentItem = cartItemList.find(
      (cartItem) => cartItem.id === cartItemId,
    );
    if (!currentItem) return;

    const increasedQuantity = currentItem.quantity + 1;
    const newCartItemList = cartItemList.map((cartItem) =>
      cartItem.id === cartItemId
        ? { ...cartItem, quantity: increasedQuantity }
        : cartItem,
    );

    try {
      await requestSetCartItemQuantity(cartItemId, increasedQuantity);
      setCartItemList(newCartItemList);
    } catch (error) {
      throw error;
    }
  };

  const decreaseQuantity = async (cartItemId: number) => {
    const currentItem = cartItemList.find(
      (cartItem) => cartItem.id === cartItemId,
    );
    if (!currentItem) return;

    const decreasedQuantity = Math.max(currentItem.quantity - 1, 1);
    const newCartItemList = cartItemList.map((cartItem) =>
      cartItem.id === cartItemId
        ? { ...cartItem, quantity: decreasedQuantity }
        : cartItem,
    );

    try {
      await requestSetCartItemQuantity(cartItemId, decreasedQuantity);
      setCartItemList(newCartItemList);
    } catch (error) {
      throw error;
    }
  };

  return { cartItemQuantity, increaseQuantity, decreaseQuantity };
};
