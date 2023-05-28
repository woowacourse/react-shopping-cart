import { useCallback, useState } from 'react';

const useCount = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);

  const handleDecreaseCount = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  const handleIncreaseCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleCountChange = useCallback((count: number) => {
    setCount(count);
  }, []);

  return { count, handleDecreaseCount, handleIncreaseCount, handleCountChange };
};

export { useCount };
