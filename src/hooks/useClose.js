import { useState } from 'react';
import { MODAL } from 'constants';

const useClose = () => {
  const [autoDebounce, setAutoDebounce] = useState(null);

  const clearTimer = () => {
    if (autoDebounce) {
      clearTimeout(autoDebounce);
    }
  };

  const autoClose = close => {
    setAutoDebounce(setTimeout(() => close(), MODAL.CLOSE_TIME));
  };

  return [clearTimer, autoClose];
};

export default useClose;
