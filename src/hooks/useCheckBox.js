import { useState, useMemo } from 'react';

export const useCheckBox = (boxItems) => {
  const [checkboxItems, setCheckboxItems] = useState(() => boxItems.map((item) => item.id));
  const isAllChecked = useMemo(
    () => boxItems.length === checkboxItems.length,
    [boxItems.length, checkboxItems.length],
  );

  const handleChecked = (productId) => {
    const prevState = [...checkboxItems];
    const itemIndex = checkboxItems.findIndex((id) => id === productId);

    if (itemIndex === -1) {
      setCheckboxItems([...prevState, productId]);
      return;
    }

    setCheckboxItems(() => {
      const nextState = prevState.filter((_, i) => i !== itemIndex);
      return nextState;
    });
  };

  const isChecked = (productId) => checkboxItems.findIndex((id) => id === productId) !== -1;

  const checkAllSelectButton = () => {
    if (boxItems.length <= 0) {
      return;
    }

    if (checkboxItems.length >= boxItems.length) {
      setCheckboxItems([]);
      return;
    }

    setCheckboxItems(boxItems.map((item) => item.id));
  };

  const clearCheckBoxItems = () => {
    if (checkboxItems <= 0) {
      return;
    }

    setCheckboxItems([]);
  };

  return {
    checkboxItems,
    isAllChecked,
    handleChecked,
    isChecked,
    checkAllSelectButton,
    clearCheckBoxItems,
  };
};
