import { useState, useEffect } from 'react';
import { CartProduct } from '../types/cart';

interface CartItemsResponse {
  content: CartProduct[];
}

export const useCartSelection = (cartItems: CartItemsResponse | undefined) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const initializeCheckedItems = (items: CartProduct[]) => {
    const allIds = items.map((item) => item.id);
    setCheckedItems(allIds);
    setIsInitialLoad(false);
  };

  const updateCheckedItems = (items: CartProduct[]) => {
    setCheckedItems((prev) => {
      const currentIds = items.map((item) => item.id);
      return prev.filter((id) => currentIds.includes(id));
    });
  };

  useEffect(() => {
    if (!cartItems?.content) {
      handleEmptyCart();
      return;
    }

    if (isInitialLoad) {
      initializeCheckedItems(cartItems.content);
    } else {
      updateCheckedItems(cartItems.content);
    }
  }, [cartItems, isInitialLoad]);

  const handleEmptyCart = () => {
    setCheckedItems([]);
  };

  const isAllChecked = Boolean(
    cartItems?.content &&
      cartItems.content.length > 0 &&
      checkedItems.length === cartItems.content.length,
  );

  const handleAllCheck = (checked: boolean) => {
    if (!cartItems?.content) return;

    if (checked) {
      setCheckedItems([]);
    } else {
      const allIds = cartItems.content.map((item: CartProduct) => item.id);
      setCheckedItems(allIds);
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
    handleAllCheck,
    toggleItem,
  };
};
