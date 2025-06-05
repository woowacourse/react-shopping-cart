import { useState, useEffect } from 'react';
import { CartProduct } from '../types/cart';

interface CartItemsResponse {
  content: CartProduct[];
}

export function useCartSelection(cartItems: CartItemsResponse | undefined) {
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

  const handleEmptyCart = () => {
    setCheckedItems([]);
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

  const isAllChecked = Boolean(
    cartItems?.content?.length && checkedItems.length === cartItems.content.length,
  );

  const handleAllCheck = (checked: boolean) => {
    if (!cartItems?.content) return;

    if (checked) {
      const allIds = cartItems.content.map((item) => item.id);
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
    isAllChecked,
    handleAllCheck,
    toggleItem,
  };
}
