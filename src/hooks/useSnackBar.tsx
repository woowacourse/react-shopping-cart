import React, { useState } from 'react';
import { SNACKBAR_DELAY_TIME } from 'constants/index';

const useSnackBar = (initialState: boolean) => {
  const [showSnackbar, setShowSnackBar] = useState(initialState);
  const [message, setMessage] = useState('');

  let timer: ReturnType<typeof setTimeout>;

  const triggerSnackbar = (message: string) => {
    if (showSnackbar) return;

    setShowSnackBar(true);
    setMessage(message);

    timer = setTimeout(() => {
      clearTimeout(timer);
      setShowSnackBar(false);
    }, SNACKBAR_DELAY_TIME);
  };

  return { message, showSnackbar, triggerSnackbar };
};

export default useSnackBar;
