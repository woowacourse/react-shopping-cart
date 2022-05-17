import { useDispatch } from 'react-redux';
import { useRef, useCallback } from 'react';
import { SnackbarActionType } from 'redux/actions/snackbar';

const useSnackBar = () => {
  const timerRef = useRef(null);

  const snackbarDispatch = useDispatch();

  const openSnackbar = useCallback(type => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    snackbarDispatch({ type: SnackbarActionType.OPEN_SNACKBAR, payload: type });
    timerRef.current = setTimeout(() => {
      snackbarDispatch({ type: SnackbarActionType.CLOSE_SNACKBAR });
    }, 3000);
  }, []);

  return { openSnackbar };
};

export default useSnackBar;
