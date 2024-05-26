import { useRecoilState } from 'recoil';

import { cartItemListState } from '../../recoil/cartItem/atom';
import { requestSetCartItemQuantity } from '../../apis/cartItemList';
import { FailedSetCartItemQuantityError } from '../../error/customError';
import useApiErrorState from '../error/useApiErrorState';

export const useCartItemQuantity = () => {
  const { setApiError } = useApiErrorState();
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
      setApiError(new FailedSetCartItemQuantityError());
    }
  };

  const decreaseQuantity = async (cartItemId: number) => {
    const currentItem = cartItemList.find(
      (cartItem) => cartItem.id === cartItemId,
    );
    if (
      !currentItem ||
      cartItemList.find(({ id }) => id === cartItemId)?.quantity === 1
    )
      return;

    const decreasedQuantity = currentItem.quantity - 1;
    const newCartItemList = cartItemList.map((cartItem) =>
      cartItem.id === cartItemId
        ? { ...cartItem, quantity: decreasedQuantity }
        : cartItem,
    );

    try {
      await requestSetCartItemQuantity(cartItemId, decreasedQuantity);
      setCartItemList(newCartItemList);
    } catch (error) {
      setApiError(new FailedSetCartItemQuantityError());
    }
  };

  return { cartItemQuantity, increaseQuantity, decreaseQuantity };
};
