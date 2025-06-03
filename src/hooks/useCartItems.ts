import { useEffect, useState } from 'react';
import getCartItems from '../api/getCartItems';
import { CartItem } from '../types';
import patchCartItems from '../api/patchCartItems';
import deleteCartItems from '../api/deleteCartItems';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchData = async () => {
    const content = await getCartItems();
    setCartItems(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseCartItemQuantity = async (id: number) => {
    const targetCartItem = cartItems.find((item) => item.id === id);
    if (!targetCartItem) return;

    await patchCartItems(id, targetCartItem.quantity + 1);
    await fetchData();
  };

  const decreaseCartItemQuantity = async (id: number) => {
    const targetCartItem = cartItems.find((item) => item.id === id);
    if (!targetCartItem) return;

    if (targetCartItem.quantity === 1) {
      await deleteCartItems(id);
    } else {
      await patchCartItems(id, targetCartItem.quantity - 1);
    }

    await fetchData();
  };

  const deleteCartItem = async (id: number) => {
    const targetCartItem = cartItems.find((item) => item.id === id);
    if (!targetCartItem) return;

    await deleteCartItems(id);
    await fetchData();
  };

  return {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  };
};

export default useCartItems;
