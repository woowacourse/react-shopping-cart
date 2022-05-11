import { SnackbarAction, SnackbarActionType } from 'redux/actions/snackbar';

interface SnackbarState {
  isSnackbarOpen: boolean;
  timer: NodeJS.Timeout;
  contentsType: string;
}

const initialState: SnackbarState = {
  isSnackbarOpen: false,
  timer: null,
  contentsType: null,
};

export const snackbarReducer = (state = initialState, action: SnackbarAction) => {
  switch (action.type) {
    case SnackbarActionType.OPEN_SNACKBAR:
      return { ...state, isSnackbarOpen: true, contentsType: action.payload };
    case SnackbarActionType.CLOSE_SNACKBAR:
      return { ...state, isSnackbarOpen: false };
    case SnackbarActionType.REGISTER_TIMER:
      return { ...state, timer: action.payload };
    default:
      return state;
  }
};
