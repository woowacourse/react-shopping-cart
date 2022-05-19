import { useState } from "react";

export const useNumberInput = ({ initialValue, min, max, step }) => {
  const [value, setValue] = useState(Number(initialValue));

  const handleInputChange = ({ target }) => {
    const targetValue = Number(target.value);
    if (targetValue % step !== 0) return;
    if (targetValue > max) {
      setValue(max);
      return;
    }
    if (targetValue < min) {
      setValue(min);
      return;
    }
    setValue(targetValue);
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
