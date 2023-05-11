import React, { useCallback, useState } from 'react';

interface UseCounterOptions {
  max?: number;
  min?: number;
  step?: number;
}

const useCounter = (
  options: UseCounterOptions
): [number, VoidFunction, VoidFunction] => {
  const { max = Infinity, min = Infinity, step = 1 } = options;
  const [count, setCount] = useState(1);

  const increase = useCallback(() => {
    setCount((prev) => (prev < max ? prev + step : prev));
  }, []);

  const decrease = useCallback(() => {
    setCount((prev) => (prev > min ? prev - step : prev));
  }, []);

  return [count, increase, decrease];
};

export default useCounter;
