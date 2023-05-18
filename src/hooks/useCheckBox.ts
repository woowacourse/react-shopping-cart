import { useState } from "react";

export const useCheckBox = (number: number) => {
  const [checkedArray, setCheckedArray] = useState(
    [...Array(number)].map(() => true)
  );

  const getAllChecked = () => {
    return checkedArray.every((checked) => checked);
  };

  const handleCheckBox = (changedIndex: number) => () => {
    setCheckedArray((prev) =>
      prev.map((checked, index) =>
        changedIndex === index ? !checked : checked
      )
    );
  };

  const handleAllCheckBox = () => {
    setCheckedArray((prev) => prev.map(() => !getAllChecked()));
  };

  const allChecked = getAllChecked();

  return { checkedArray, allChecked, handleCheckBox, handleAllCheckBox };
};
