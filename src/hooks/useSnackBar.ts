import { useState } from 'react';
import SnackBar from '../components/commons/SnackBar/SnackBar';

const useSnackBar = () => {
  const [snackBarMessage, _setSnackBarMessage] = useState({ message: '' });

  const setSnackBarMessage = (message: string) => {
    _setSnackBarMessage({ message });
  };

  return { SnackBar, snackBarMessage: snackBarMessage.message, setSnackBarMessage };
};

export default useSnackBar;
