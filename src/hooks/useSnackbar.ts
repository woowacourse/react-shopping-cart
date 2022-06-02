import { GlobalActionType } from '@/store/global/action';
import { useDispatch } from 'react-redux';

export const useSnackbar = () => {
  const dispatch = useDispatch();

  const triggerFailedSnackbar = (message: string) => {
    dispatch({
      type: GlobalActionType.OPEN_SNACKBAR,
      payload: { message, isSuccess: false },
    });
  };

  const triggerSucceededSnackbar = (message: string) => {
    dispatch({
      type: GlobalActionType.OPEN_SNACKBAR,
      payload: { message, isSuccess: true },
    });
  };

  return {
    triggerFailedSnackbar,
    triggerSucceededSnackbar,
  };
};
