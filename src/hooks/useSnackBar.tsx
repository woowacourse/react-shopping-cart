import React, { useState } from 'react';

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
    }, 2000);
  };

  return { message, showSnackbar, triggerSnackbar };
};

export default useSnackBar;
