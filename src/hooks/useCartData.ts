import { useState } from 'react';
import { CartItemType } from '../types/response';
import { getCartItemById } from '../utils/getCartItemById';
import {
  deleteCartItem,
  getCart,
  modifyCartItem,
} from '../services/cartService';

const useCartData = () => {
  const [cartData, setCartData] = useState<CartItemType[]>([]);

  const updateCartItem = async (cartId: number) => {
    const cartItem = getCartItemById(cartData, cartId);
    if (!cartItem) {
      return;
    }
    if (cartItem.quantity === 1) {
      await removeCartItem(cartItem.id);
      return;
    }
    await increaseCartItem(cartItem.id, cartItem.quantity - 1);
  };

  const increaseCartItem = async (cartItemId: number, quantity: number) => {
    await modifyCartItem(cartItemId, quantity);
    const cartData = await getCart();
    setCartData(cartData);
  };

  const removeCartItem = async (cartItemId: number) => {
    await deleteCartItem(cartItemId);
    const cartData = await getCart();
    setCartData(cartData);
  };

  const initCartData = (updateData: CartItemType[]) => {
    setCartData(updateData);
  };

  return {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
  };
};

export default useCartData;
