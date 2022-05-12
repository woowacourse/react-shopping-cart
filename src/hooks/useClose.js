import { useState } from 'react';
import { MODAL } from 'constants';

const useClose = () => {
  const [manualDebounce, setManualDebounce] = useState(null);
  const [autoDebounce, setAutoDebounce] = useState(null);

  const clearTimer = () => {
    if (manualDebounce) {
      clearTimeout(manualDebounce);
    }

    if (autoDebounce) {
      clearTimeout(autoDebounce);
    }
  };

  const manualClose = close => {
    setManualDebounce(setTimeout(() => close(), MODAL.CLOSE_TIME));
  };

  const autoClose = close => {
    setAutoDebounce(setTimeout(() => close(), MODAL.CLOSE_TIME));
  };

  return [clearTimer, manualClose, autoClose];
};

export default useClose;
