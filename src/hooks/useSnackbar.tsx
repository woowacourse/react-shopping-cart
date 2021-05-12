import React, { useState, useCallback } from 'react';
import SnackbarComponent from '../components/shared/Snackbar/Snackbar';

const useSnackbar = () => {
  const [isSnackbarShowing, setSnackbarShowing] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();

  const openSnackbar = useCallback(
    (message: string, delay = 2000) => {
      setSnackbarShowing(true);
      setSnackbarMessage(message);

      if (timerId) {
        clearTimeout(timerId);
      }

      const currentTimerId = setTimeout(() => {
        setSnackbarShowing(false);
      }, delay);

      setTimerId(currentTimerId);
    },
    [timerId]
  );

  const Snackbar = () => <SnackbarComponent isShowing={isSnackbarShowing} message={snackbarMessage} />;

  return { Snackbar, openSnackbar };
};

export default useSnackbar;
