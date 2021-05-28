import { HIDE_CONFIRM_MODAL, HIDE_SNACKBAR, SHOW_CONFIRM_MODAL, SHOW_SNACKBAR } from './actions';

export interface ShowSnackbartAction {
  type: typeof SHOW_SNACKBAR;
}

export interface HideSnackbartAction {
  type: typeof HIDE_SNACKBAR;
}

export interface ShowConfirmModalAction {
  type: typeof SHOW_CONFIRM_MODAL;
}

export interface HideConfirmModalAction {
  type: typeof HIDE_CONFIRM_MODAL;
}

export type LayoutAction = ShowSnackbartAction | HideSnackbartAction | ShowConfirmModalAction | HideConfirmModalAction;

export interface LayoutState {
  isSnackbarShown: boolean;
  isConfirmModalShown: boolean;
}
