import { useEffect, useState } from 'react';
import { Cart } from 'types';

export const useCheckedItems = (cartList: Cart[]) => {
  const [checkedItems, setCheckedItems] = useState<Cart[]>([]);

  useEffect(() => {
    setCheckedItems(cartList);
  }, [cartList]);

  const removeAllCheckedItems = () => {
    setCheckedItems([]);
  };

  const checkAllItems = () => {
    setCheckedItems(cartList);
  };

  const checkItem = (cartItem: Cart) => {
    if (checkedItems.includes(cartItem)) {
      setCheckedItems((prev) => prev.filter(({ id }) => id !== cartItem.id));
      return;
    }
    setCheckedItems((prev) => [...prev, cartItem]);
  };

  return {
    checkedItems,
    checkItem,
    removeAllCheckedItems,
    checkAllItems,
  };
};
