import { useRef } from 'react';

interface useCounterInputProps {
  maxLimit?: number;
  minLimit?: number;
  handleMaxLimitExceeded?: () => void;
  handleMinLimitExceeded?: () => void;
  increaseCallback?: () => void;
  decreaseCallback?: () => void;
}

export const useCounterInput = ({
  maxLimit,
  minLimit,
  handleMaxLimitExceeded,
  handleMinLimitExceeded,
  increaseCallback,
  decreaseCallback,
}: useCounterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    inputRef.current?.stepUp();

    if (increaseCallback) increaseCallback();

    if (maxLimit === undefined) return;

    if (Number(inputRef.current?.value) === maxLimit && handleMaxLimitExceeded)
      return handleMaxLimitExceeded();
  };

  const handleDecrease = () => {
    inputRef.current?.stepDown();

    if (decreaseCallback) decreaseCallback();

    if (minLimit === undefined) return;

    if (Number(inputRef.current?.value) === minLimit && handleMinLimitExceeded)
      return handleMinLimitExceeded();
  };

  return { handleIncrease, handleDecrease, inputRef };
};
