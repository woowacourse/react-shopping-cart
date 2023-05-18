import { useRef } from "react";

interface useCounterInputProps {
  max?: number;
  min?: number;
  handleMinValueExceeded?: () => void;
  handleMaxvalueExceeded?: () => void;
  handleValueChanged?: (quantity: number) => void;
}

export const useCounterInput = ({
  min,
  max,
  handleMinValueExceeded,
  handleMaxvalueExceeded,
  handleValueChanged,
}: useCounterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    inputRef.current?.stepUp();
    if (handleValueChanged) handleValueChanged(Number(inputRef.current?.value));

    if (max === undefined) return;

    if (Number(inputRef.current?.value) === max && handleMaxvalueExceeded) return handleMaxvalueExceeded();
  };

  const handleDecrease = () => {
    inputRef.current?.stepDown();
    if (handleValueChanged) handleValueChanged(Number(inputRef.current?.value));

    if (min === undefined) return;

    if (Number(inputRef.current?.value) === min && handleMinValueExceeded) return handleMinValueExceeded();
  };

  return { handleIncrease, handleDecrease, inputRef };
};
