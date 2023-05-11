import { useState } from 'react';

export const useCountInput = (initCount: number | undefined) => {
  const [count, setState] = useState(initCount || 1);

  const setCount = (inputValue: string) => {
    if (!isValidCount(inputValue)) return;

    const value = Number(inputValue);

    if (value < 1) return setState(1);

    if (value > 99) return setState(99);

    setState(value);
  };

  const increaseCount = () => {
    setState((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setState((prev) => prev - 1);
  };

  const isValidCount = (inputValue: string) => {
    return /^[0-9]*$/.test(inputValue);
  };

  return { count, setCount, increaseCount, decreaseCount };
};
