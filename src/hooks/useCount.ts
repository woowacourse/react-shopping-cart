import { useCallback, useState } from 'react';

import { isNumber } from '../utils/validator';

const useCount = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);

  const handleDecreaseCount = useCallback((step: number) => {
    setCount((prevCount) => prevCount - step);
  }, []);

  const handleIncreaseCount = useCallback((step: number) => {
    setCount((prevCount) => prevCount + step);
  }, []);

  const handleCountChange = useCallback((input: string, minCount: number, maxCount: number) => {
    if (!isNumber(input)) return;

    const currCount = Number(input);

    if (currCount < minCount || currCount > maxCount) return;

    setCount(currCount);
  }, []);

  return { count, handleDecreaseCount, handleIncreaseCount, handleCountChange };
};

export { useCount };
