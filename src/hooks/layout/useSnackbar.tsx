import { useRef, useState } from 'react';
import { Snackbar } from '../../components/commons/Snackbar/Snackbar.styles';
import { SNACKBAR_ANIMATION_DURATION, SNACKBAR_DURATION } from '../../constants/layout';

const useSnackbar = (duration: number | undefined = 300) => {
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

  const SnackbarContainer = () => (
    <Snackbar isShown={isSnackbarShown} animationDuration={duration}>
      {snackbarMessage}
    </Snackbar>
  );

  return { snackbarMessage, isSnackbarShown, showSnackbar, SnackbarContainer };
};

export default useSnackbar;
