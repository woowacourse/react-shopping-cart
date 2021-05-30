import { useRef, useState } from 'react';
import { SNACKBAR_ANIMATION_DURATION, SNACKBAR_DURATION } from '../../constants/layout';

const useSnackbar = () => {
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  let timer = useRef<NodeJS.Timeout | null>(null);

  const showSnackbar = (message: string) => {
    if (!isSnackbarShown) {
      console.log('show!');
      setIsSnackbarShown(true);
      setSnackbarMessage(message);

      timer.current = setTimeout(() => {
        setIsSnackbarShown(false);
      }, SNACKBAR_DURATION);
      return;
    }

    timer.current && clearTimeout(timer.current);

    setIsSnackbarShown(false);

    timer.current = setTimeout(() => {
      setIsSnackbarShown(true);
      setSnackbarMessage(message);
    }, SNACKBAR_ANIMATION_DURATION);

    timer.current = setTimeout(() => {
      setIsSnackbarShown(false);
    }, SNACKBAR_DURATION);
  };

  return { snackbarMessage, isSnackbarShown, showSnackbar };
};

export default useSnackbar;
