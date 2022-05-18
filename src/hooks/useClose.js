import { useState } from 'react';
import { MODAL } from 'constants';

const useClose = () => {
  const [debounce, setDebounce] = useState(null);

  const clearTimer = () => {
    if (debounce) {
      clearTimeout(debounce);
    }
  };

  const setAutoCloseTimer = callback => {
    setDebounce(setTimeout(() => callback(), MODAL.CLOSE_TIME));
  };

  const extendTimer = callback => {
    clearTimer();
    setAutoCloseTimer(callback);
  };

  return [clearTimer, setAutoCloseTimer, extendTimer];
};

export default useClose;
