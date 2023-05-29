import { useCallback, useState } from 'react';

export interface UseCounterOptions {
  init?: number;
  max?: number;
  min?: number;
  step?: number;
}

const useCounter = (
  options: UseCounterOptions
): [number, VoidFunction, VoidFunction] => {
  const { init = 1, max = Infinity, min = -Infinity, step = 1 } = options;
  const [count, setCount] = useState(init);

  const increase = useCallback(() => {
    setCount((prev) => Math.min(prev + step, max));
  }, []);

  const decrease = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min));
  }, []);

  return [count, increase, decrease];
};

export default useCounter;
