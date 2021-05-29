import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '..';
import { SNACKBAR_ANIMATION_DURATION, SNACKBAR_DURATION } from '../../constants/layout';
import { snackbarAction } from '../../modules/layout/actions';

const useSnackbar = () => {
  const { snackbarMessage, isSnackbarShown } = useAppSelector(state => state.layout);
  const dispatch = useAppDispatch();
  let timer = useRef<NodeJS.Timeout | null>(null);

  const showSnackbar = (message: string) => {
    if (!isSnackbarShown) {
      dispatch(snackbarAction.showSnackbar(message));

      timer.current = setTimeout(() => {
        dispatch(snackbarAction.hideSnackbar());
      }, SNACKBAR_DURATION);
      return;
    }

    timer.current && clearTimeout(timer.current);

    dispatch(snackbarAction.hideSnackbar());

    timer.current = setTimeout(() => {
      dispatch(snackbarAction.showSnackbar(message));
    }, SNACKBAR_ANIMATION_DURATION);

    timer.current = setTimeout(() => {
      dispatch(snackbarAction.hideSnackbar());
    }, SNACKBAR_DURATION);
  };

  return { snackbarMessage, isSnackbarShown, showSnackbar };
};

export default useSnackbar;
