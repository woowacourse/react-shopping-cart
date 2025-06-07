import { useState, useEffect } from 'react';
import { CartProduct } from '../types/cart';

interface CartItemsResponse {
  content: CartProduct[];
}

export const useCartSelection = (cartItems: CartItemsResponse | undefined) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    if (cartItems?.content && cartItems.content.length > 0) {
      const itemIds = cartItems.content.map((item: CartProduct) => item.id);
      setCheckedItems(itemIds);
    } else {
      setCheckedItems([]);
    }
  }, [cartItems]);

  const isAllChecked = Boolean(
    cartItems?.content &&
      cartItems.content.length > 0 &&
      checkedItems.length === cartItems.content.length,
  );

  const checkAll = (checked: boolean) => {
    if (!cartItems?.content) return;

    if (checked) {
      const allIds = cartItems.content.map((item: CartProduct) => item.id);
      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const toggleItem = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  return {
    checkedItems,
    setCheckedItems,
    isAllChecked,
    checkAll,
    toggleItem,
  };
};
