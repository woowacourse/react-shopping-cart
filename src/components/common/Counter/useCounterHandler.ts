import { ChangeEventHandler } from 'react';
import { isNumericString } from '../../../utils/isNumericString';

interface Parameters {
  count: number;
  updateCount: (count: number) => void;
  onClickedButton?: (quantity: number) => void;
  onChangedInput?: (quantity: number) => void;
  onBlurredInput?: (quantity: number) => void;
  min?: number;
  max?: number;
}

const useCounterHandler = ({
  count,
  updateCount,
  onClickedButton,
  onChangedInput,
  onBlurredInput,
  min = 0,
  max = 99,
}: Parameters) => {
  const handleIncreaseButtonClick = () => {
    const increasedCount = count + 1;

    if (increasedCount > max) return;

    updateCount(increasedCount);
    onClickedButton?.(increasedCount);
  };

  const handleDecreaseButtonClick = () => {
    const decreasedCount = count - 1;

    if (decreasedCount < min) return;

    updateCount(decreasedCount);
    onClickedButton?.(decreasedCount);
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
    onChangedInput?.(valueToNumber);
  };

  const handleInputBlur = () => {
    onBlurredInput?.(count);
  };

  return {
    handleIncreaseButtonClick,
    handleDecreaseButtonClick,
    handleInputChange,
    handleInputBlur,
  } as const;
};

export default useCounterHandler;
