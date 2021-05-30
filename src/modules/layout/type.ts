import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';

export interface ShowSnackbarAction {
  type: typeof SHOW_SNACKBAR;
  payload: string;
}

export interface HideSnackbartAction {
  type: typeof HIDE_SNACKBAR;
}

export interface ShowConfirmModalAction {
  type: typeof SHOW_CONFIRM_MODAL;
  payload: string;
}

export interface HideConfirmModalAction {
  type: typeof HIDE_CONFIRM_MODAL;
}

export type LayoutAction = ShowSnackbarAction | HideSnackbartAction | ShowConfirmModalAction | HideConfirmModalAction;

export interface LayoutState {
  isSnackbarShown: boolean;
  isConfirmModalShown: boolean;
  snackbarMessage: string;
  confirmModalMessage: string;
}
