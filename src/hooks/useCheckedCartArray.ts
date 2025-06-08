import { useEffect, useState } from 'react';
import type { CartItemType } from '../types/response';

const STORAGE_KEY = 'cart-checked-items';

const useCheckedCartArray = (cartData: CartItemType[]) => {
  const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (cartData.length === 0) return;

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const storedIds = JSON.parse(storedData) as number[];
        const validStoredIds = storedIds.filter((id) =>
          cartData.some((item) => item.id === id)
        );
        setCheckedItemIds(new Set(validStoredIds));
      } else {
        // 저장된 상태가 없으면 기본적으로 모든 아이템 체크
        setCheckedItemIds(new Set(cartData.map((item) => item.id)));
      }
    } catch (error) {
      console.warn('장바구니 체크 상태 로드 실패:', error);
      setCheckedItemIds(new Set(cartData.map((item) => item.id)));
    }
  }, [cartData]);

  useEffect(() => {
    if (checkedItemIds.size > 0 || cartData.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(Array.from(checkedItemIds))
        );
      } catch (error) {
        console.warn('장바구니 체크 상태 저장 실패:', error);
      }
    }
  }, [checkedItemIds, cartData.length]);

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

export default useCheckedCartArray;
