import { useState } from "react";

export const useNumberInput = ({
  initialValue,
  min,
  max,
  step,
  onChangeValue,
}) => {
  const [value, setValue] = useState(Number(initialValue));

  const handleInputChange = ({ target }) => {
    const targetValue = Number(target.value);

    if (Number.isInteger(targetValue)) return;

    const newValue = Math.max(Math.min(targetValue, max), min);
    setValue(newValue);
    onChangeValue(newValue);
  };

  const handleIncreaseButtonClick = () => {
    setValue((prevValue) => {
      const newValue = prevValue + step;

      if (newValue > max) {
        onChangeValue(prevValue);
        return prevValue;
      }
      onChangeValue(newValue);
      return newValue;
    });
  };

  const handleDecreaseButtonClick = () => {
    setValue((prevValue) => {
      const newValue = prevValue - step;

      if (newValue < min) {
        onChangeValue(prevValue);
        return prevValue;
      }
      onChangeValue(newValue);
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
