import { useCallback, useMemo, useState } from 'react';
import { CartItemType } from '../types';

function useCartSelection() {
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);
  const isAllSelected = useMemo(
    () => isSelectedList.every((isSelected) => isSelected),
    [isSelectedList]
  );

  const getSelectedCartItems = useCallback(
    (cartItems: CartItemType[]) =>
      cartItems.filter((_, index) => isSelectedList[index]),
    [isSelectedList]
  );

  const toggleSelect = useCallback((toggleIndex: number) => {
    setIsSelectedList((prevSelectedList) =>
      prevSelectedList.map((isSelected, index) =>
        toggleIndex === index ? !isSelected : isSelected
      )
    );
  }, []);

  const toggleAllSelect = useCallback(() => {
    setIsSelectedList((prevSelectedList) =>
      Array.from({ length: prevSelectedList.length }, () => !isAllSelected)
    );
  }, [isAllSelected]);

  return {
    isSelectedList,
    isAllSelected,
    setIsSelectedList,
    getSelectedCartItems,
    toggleSelect,
    toggleAllSelect,
  };
}
export default useCartSelection;
