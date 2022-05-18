import { useState } from 'react';

const MAX_COUNT_WARNING_MESSAGE = '구입할 수 있는 최소 수량입니다.';

const MIN_COUNT_WARNING_MESSAGE = '구입할 수 있는 최대 수량입니다.';

export const useCount = ({ initialValue, min, max }) => {
  const [count, setCount] = useState(initialValue);

  const onIncrement = () => {
    setCount((prev) => {
      if (prev === max) {
        alert(MAX_COUNT_WARNING_MESSAGE);
        return prev;
      }

      return prev + 1;
    });
  };

  const onDecrement = () => {
    setCount((prev) => {
      if (prev === min) {
        alert(MIN_COUNT_WARNING_MESSAGE);
        return prev;
      }

      return prev - 1;
    });
  };

  return [count, onIncrement, onDecrement];
};
