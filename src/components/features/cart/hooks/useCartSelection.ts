import { useCallback, useMemo, useState } from 'react';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';

function useCartSelection(cartItems: CartItemType[]) {
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

  const selectCartItems = getItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);
  const disabled = !selectedList.some((isSelected) => isSelected);

  return {
    selectedList,
    allSelected,
    selectCartItems,
    disabled,
    orderPrice,
    setSelectedList,
    getItems,
    toggle,
    toggleAll,
  };
}
export default useCartSelection;
