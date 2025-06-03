import { useEffect, useState } from 'react';
import type { CartItemType } from '../types/response';

const useCheckedArray = (cartData: CartItemType[]) => {
  const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCheckedItemIds(new Set(cartData.map((item) => item.id)));
  }, [cartData]);

  const isItemChecked = (cartId: number) => {
    return checkedItemIds.has(cartId);
  };

  const toggleItemCheck = (cartId: number) => {
    const newCheckedIds = new Set(checkedItemIds);
    if (newCheckedIds.has(cartId)) {
      newCheckedIds.delete(cartId);
    } else {
      newCheckedIds.add(cartId);
    }
    setCheckedItemIds(newCheckedIds);
  };

  const toggleAllItemsCheck = (cartData: CartItemType[]) => {
    if (checkedItemIds.size === cartData.length) {
      setCheckedItemIds(new Set());
    } else {
      setCheckedItemIds(new Set(cartData.map((item) => item.id)));
    }
  };

  const getCheckedItemsArray = () => {
    return Array.from(checkedItemIds);
  };

  return {
    isAllChecked:
      checkedItemIds.size === cartData.length && cartData.length > 0,
    isCheckedArray: getCheckedItemsArray(),
    justifyIsChecked: isItemChecked,
    controlCheckBox: toggleItemCheck,
    controlAllCheckBox: toggleAllItemsCheck,
    checkedItemIds,
    isItemChecked,
    toggleItemCheck,
    toggleAllItemsCheck,
  };
};

export default useCheckedArray;
