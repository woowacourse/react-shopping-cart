import { useCallback, useMemo, useState } from 'react';
import { CartItemType } from '../types';

function useCartSelection() {
  const [selectedList, setSelectedList] = useState<boolean[]>([]);
  const allSelected = useMemo(
    () => selectedList.every((isSelected) => isSelected),
    [selectedList]
  );

  const getItems = useCallback(
    (cartItems: CartItemType[]) =>
      cartItems.filter((_, index) => selectedList[index]),
    [selectedList]
  );

  const toggle = useCallback((toggleIndex: number) => {
    setSelectedList((prevSelectedList) =>
      prevSelectedList.map((isSelected, index) =>
        toggleIndex === index ? !isSelected : isSelected
      )
    );
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedList((prevSelectedList) =>
      Array.from({ length: prevSelectedList.length }, () => !allSelected)
    );
  }, [allSelected]);

  return {
    selectedList,
    allSelected,
    setSelectedList,
    getItems,
    toggle,
    toggleAll,
  };
}
export default useCartSelection;
