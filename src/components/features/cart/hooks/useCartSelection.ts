import { useCallback, useMemo, useState } from 'react';
import { CartItemType } from '../types';

function useCartSelection() {
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);
  const isAllItemSelected = useMemo(
    () => isSelectedList.every((isSelected) => isSelected),
    [isSelectedList]
  );

  const isSomeItemSelected = useMemo(
    () => isSelectedList.some((isSelected) => isSelected),
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
      Array.from({ length: prevSelectedList.length }, () => !isAllItemSelected)
    );
  }, [isAllItemSelected]);

  return {
    isSelectedList,
    isAllItemSelected,
    isSomeItemSelected,
    setIsSelectedList,
    getSelectedCartItems,
    toggleSelect,
    toggleAllSelect,
  };
}
export default useCartSelection;
