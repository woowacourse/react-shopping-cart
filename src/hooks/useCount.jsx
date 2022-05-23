import { useState } from 'react';

import { WARNING_MESSAGES } from 'constants/messages';

export const useCount = ({ initialValue, min, max }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    setCount((prev) => {
      if (prev === max) {
        alert(WARNING_MESSAGES.MAX_QUANTITY);
        return prev;
      }

      return prev + 1;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      if (prev === min) {
        alert(WARNING_MESSAGES.MIN_QUANTITY);
        return prev;
      }

      return prev - 1;
    });
  };

  return [count, handleIncrement, handleDecrement];
};
