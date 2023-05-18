import React, { useCallback, useState } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  max?: number;
  min?: number;
  step?: number;
}

const useCounter = (
  options: UseCounterOptions
): [number, VoidFunction, VoidFunction] => {
  const {
    initialValue = 1,
    max = Infinity,
    min = Infinity,
    step = 1,
  } = options;
  const [count, setCount] = useState(initialValue);

  const increase = useCallback(() => {
    setCount((prev) => Math.min(prev + 1, max));
  }, []);

  const decrease = useCallback(() => {
    setCount((prev) => Math.max(prev - 1, min));
  }, []);

  return [count, increase, decrease];
};

export default useCounter;
