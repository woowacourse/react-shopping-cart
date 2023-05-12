import { ChangeEventHandler } from 'react';
import { isNumber } from '../../utils/isNumber';

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
    if (count + 1 > max) return;

    updateCount(count + 1);
    onClickButton?.(count + 1);
  };

  const handleDecreaseButtonClick = () => {
    if (count - 1 < min) return;

    updateCount(count - 1);
    onClickButton?.(count - 1);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!isNumber(value)) return;

    if (Number(value) > max) {
      updateCount(max);
      return;
    }
    if (Number(value) < min) {
      updateCount(min);
      return;
    }

    updateCount(Number(value));
    onChangeInput?.(Number(value));
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
