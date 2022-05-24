import { useState } from "react";

export const useNumberInput = ({ initialValue, min, max, step }) => {
  const [value, setValue] = useState(Number(initialValue));

  const handleInputChange = ({ target }) => {
    const targetValue = Number(target.value);

    if (Number.isInteger(targetValue)) return;

    const newValue = Math.max(Math.min(targetValue, max), min);
    setValue(newValue);
  };

  const handleIncreaseButtonClick = () => {
    setValue((prevValue) => {
      const newValue = prevValue + step;

      if (newValue > max) return prevValue;
      return newValue;
    });
  };

  const handleDecreaseButtonClick = () => {
    setValue((prevValue) => {
      const newValue = prevValue - step;

      if (newValue < min) return prevValue;
      return newValue;
    });
  };

  return {
    value,
    handleInputChange,
    handleIncreaseButtonClick,
    handleDecreaseButtonClick,
  };
};
