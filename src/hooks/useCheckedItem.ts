import { useState } from "react";

const useCheckedItem = (length: number) => {
  const [isChecked, setIsChecked] = useState<boolean[]>(
    new Array(length).fill(false)
  );
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const changeIsChecked = (index: number) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    if (!newIsChecked[index] && isCheckedAll) setIsCheckedAll(false);
    if (newIsChecked.every((value) => value === true)) setIsCheckedAll(true);

    setIsChecked(newIsChecked);
  };

  const changeIsCheckedAll = () => {
    const newIsCheckedAll = !isCheckedAll;

    setIsCheckedAll(newIsCheckedAll);
    setIsChecked((prev) => {
      return prev.map(() => newIsCheckedAll);
    });
  };

  const deleteCheckedItem = () => {
    isChecked.map((isChecked, index) => {
      if (isChecked) {
        console.log("지우는 로직을 작성해야해요~~", index);
      }
      return isChecked;
    });
  };

  const countIsChecked = isChecked.reduce((count, value) => {
    return value ? count + 1 : count;
  }, 0);

  return {
    isChecked,
    isCheckedAll,
    countIsChecked,
    changeIsChecked,
    changeIsCheckedAll,
    deleteCheckedItem,
  };
};

export default useCheckedItem;
