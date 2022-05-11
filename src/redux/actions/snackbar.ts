import { Contents } from 'components/common/Snackbar';

export enum SnackbarActionType {
  OPEN_SNACKBAR = 'OPEN_SNACKBAR',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
  REGISTER_TIMER = 'REGISTER_TIMER',
}

interface OpenSnackbarAction {
  type: SnackbarActionType.OPEN_SNACKBAR;
  payload: keyof typeof Contents;
}

interface CloseSnackbarAction {
  type: SnackbarActionType.CLOSE_SNACKBAR;
}

interface RegisterTimer {
  type: SnackbarActionType.REGISTER_TIMER;
  payload: NodeJS.Timeout;
}

export type SnackbarAction = OpenSnackbarAction | CloseSnackbarAction | RegisterTimer;
