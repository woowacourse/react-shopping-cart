import { useCallback, useState } from 'react';
import { CartItemType } from '../types';

function useCartSelection() {
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);

  const isAllItemSelected = isSelectedList.every((isSelected) => isSelected);
  const isSomeItemSelected = isSelectedList.some((isSelected) => isSelected);

  const resetIsSelectedList = useCallback((length: number) => {
    setIsSelectedList(Array.from({ length }, () => true));
  }, []);

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
    states: {
      isSelectedList,
      isAllItemSelected,
      isSomeItemSelected,
    },
    actions: {
      reset: resetIsSelectedList,
      toggle: toggleSelect,
      toggleAll: toggleAllSelect,
    },
    utils: {
      getSelectedItems: getSelectedCartItems,
    },
  };
}
export default useCartSelection;
