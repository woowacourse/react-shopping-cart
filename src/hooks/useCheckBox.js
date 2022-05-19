import { useState } from "react";

export const useCheckBox = (baseList = []) => {
  const [selectedList, setSelectedList] = useState([]);

  const isSelected = (id) => selectedList.includes(id);

  const isAllSelected =
    baseList &&
    baseList.length !== 0 &&
    baseList.every((baseListItem) => selectedList.includes(baseListItem));

  const handleCheckBoxClick = (id) => () => {
    setSelectedList((prevSelectedList) => {
      const newSelectedList = [...prevSelectedList];

      if (prevSelectedList.includes(id)) {
        const selectedItemIndex = prevSelectedList.findIndex(
          (selectedItem) => selectedItem.id === id
        );
        newSelectedList.splice(selectedItemIndex, 1);
        return newSelectedList;
      }

      newSelectedList.push(id);
      return newSelectedList;
    });
  };

  const handleSelectAllCheckBoxClick = () => {
    if (isAllSelected) {
      setSelectedList([]);
      return;
    }
    setSelectedList([...baseList]);
  };

  return {
    selectedList,
    isSelected,
    isAllSelected,
    handleCheckBoxClick,
    handleSelectAllCheckBoxClick,
  };
};
