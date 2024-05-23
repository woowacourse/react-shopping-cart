import { requestSetCartItemQuantity } from '../../apis/cartItemList';
import useCartItemList from '../cartItemList/useCartItemList';

export const useCartItemQuantity = () => {
  const { cartItemList, setCartItemList } = useCartItemList();

  const cartItemQuantity = (cartItemId: number) => {
    return (
      cartItemList.find((cartItem) => cartItem.id === cartItemId)?.quantity ?? 0
    );
  };

  const increaseQuantity = async (cartItemId: number) => {
    const quantity =
      cartItemList.find((cartItem) => cartItem.id === cartItemId)?.quantity ??
      0;
    const increasedQuantity = quantity + 1;
    const newCartItemList = cartItemList.map((cartItem) => {
      const newCartItem = { ...cartItem };

      if (cartItem.id === cartItemId) {
        newCartItem.quantity = increasedQuantity;
      }

      return newCartItem;
    });

    await requestSetCartItemQuantity(cartItemId, increasedQuantity);

    setCartItemList(newCartItemList);
  };

  const decreaseQuantity = async (cartItemId: number) => {
    const quantity =
      cartItemList.find((cartItem) => cartItem.id === cartItemId)?.quantity ??
      0;
    const decreasedQuantity = Math.max(quantity - 1, 1);
    const newCartItemList = cartItemList.map((cartItem) => {
      const newCartItem = { ...cartItem };

      if (cartItem.id === cartItemId) {
        newCartItem.quantity = decreasedQuantity;
      }

      return newCartItem;
    });

    await requestSetCartItemQuantity(cartItemId, decreasedQuantity);

    setCartItemList(newCartItemList);
  };

  return { cartItemQuantity, increaseQuantity, decreaseQuantity };
};
