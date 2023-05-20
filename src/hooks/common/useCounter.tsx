import React, { useCallback, useState } from 'react';

interface UseCounterOptions {
  max?: number;
  min?: number;
  step?: number;
}

const useCounter = (
  options: UseCounterOptions
): [number, VoidFunction, VoidFunction] => {
  const { max = Infinity, min = -Infinity, step = 1 } = options;
  const [count, setCount] = useState(1);

  const increase = useCallback(() => {
    setCount((prev) => Math.min(prev + step, max));
  }, []);

  const decrease = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min));
  }, []);

  return [count, increase, decrease];
};

export default useCounter;
