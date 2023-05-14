import { ChangeEventHandler } from 'react';
import { isNumericString } from '../../utils/isNumericString';

const useCounterHandler = (
  count: number,
  updateCount: (count: number) => void,
  onClickButton?: (quantity: number) => void,
  onChangeInput?: (quantity: number) => void,
  onBlurInput?: (quantity: number) => void,
  min = 0,
  max = 99,
) => {
  const handleIncreaseButtonClick = () => {
    const increasedCount = count + 1;

    if (increasedCount > max) return;

    updateCount(increasedCount);
    onClickButton?.(increasedCount);
  };

  const handleDecreaseButtonClick = () => {
    const decreasedCount = count - 1;

    if (decreasedCount < min) return;

    updateCount(decreasedCount);
    onClickButton?.(decreasedCount);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!isNumericString(value)) return;

    const valueToNumber = Number(value);

    if (valueToNumber > max) {
      updateCount(max);
      return;
    }
    if (valueToNumber < min) {
      updateCount(min);
      return;
    }

    updateCount(valueToNumber);
    onChangeInput?.(valueToNumber);
  };

  const handleInputBlur = () => {
    onBlurInput?.(count);
  };

  return {
    handleIncreaseButtonClick,
    handleDecreaseButtonClick,
    handleInputChange,
    handleInputBlur,
  } as const;
};

export default useCounterHandler;
