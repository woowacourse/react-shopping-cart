import { CartProduct } from '../types/cart';
import {
  getCartItems,
  patchDecreaseQuantity,
  patchIncreaseQuantity,
  removeCartItem,
} from '../apis/cart';
import { useData } from '../context/DataContext';
import { MINIMUM_CART_ITEM } from '../constants/cartConfig';

export const useCartItem = (cartItem: CartProduct) => {
  const { refetch } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  const removeItem = async () => {
    await removeCartItem(cartItem);
    refetch();
  };

  const increaseQuantity = async () => {
    await patchIncreaseQuantity(cartItem);
    refetch();
  };

  const decreaseQuantity = async () => {
    if (cartItem.quantity === MINIMUM_CART_ITEM) {
      await removeItem();
      return;
    }

    await patchDecreaseQuantity(cartItem);
    refetch();
  };

  return {
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  };
};
