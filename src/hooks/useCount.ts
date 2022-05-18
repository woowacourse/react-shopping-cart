import { useState } from 'react';
interface UseCountPropsType {
  initialValue: number;
  min: number;
  max: number;
}

export const useCount = ({ initialValue, min, max }: UseCountPropsType) => {
  const [count, setCount] = useState(initialValue);

  const increaseCount = () => {
    setCount(prev => {
      if (prev === max) {
        alert('구입할 수 있는 최대 수량입니다.');
        return prev;
      }

      return prev + 1;
    });
  };

  const decreaseCount = () => {
    setCount(prev => {
      if (prev === min) {
        alert('구입할 수 있는 최소 수량입니다.');
        return prev;
      }

      return prev - 1;
    });
  };

  return { count, increaseCount, decreaseCount };
};
