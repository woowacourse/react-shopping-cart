import { useRef } from 'react';

interface useCounterInputProps {
  maxLimit?: number;
  minLimit?: number;
  handleMaxvalueExceeded?: () => void;
  handleMinValueExceeded?: () => void;
  increaseCallback?: () => void;
  decreaseCallback?: () => void;
}

export const useCounterInput = ({
  maxLimit,
  minLimit,
  handleMaxvalueExceeded,
  handleMinValueExceeded,
  increaseCallback,
  decreaseCallback,
}: useCounterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    inputRef.current?.stepUp();

    if (increaseCallback) increaseCallback();

    if (maxLimit === undefined) return;

    if (Number(inputRef.current?.value) === maxLimit && handleMaxvalueExceeded)
      return handleMaxvalueExceeded();
  };

  const handleDecrease = () => {
    inputRef.current?.stepDown();

    if (decreaseCallback) decreaseCallback();

    if (minLimit === undefined) return;

    if (Number(inputRef.current?.value) === minLimit && handleMinValueExceeded)
      return handleMinValueExceeded();
  };

  return { handleIncrease, handleDecrease, inputRef };
};
