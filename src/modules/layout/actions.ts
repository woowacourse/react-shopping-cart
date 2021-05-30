import { HideConfirmModalAction, HideSnackbartAction, ShowConfirmModalAction, ShowSnackbarAction } from './type';

export const SHOW_CONFIRM_MODAL = 'layout/confirmModal/SHOW_CONFIRM_MODAL';
export const HIDE_CONFIRM_MODAL = 'layout/confirmModal/HIDE_CONFIRM_MODAL';

export const SHOW_SNACKBAR = 'layout/snackbar/SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'layout/snackbar/HIDE_SNACKBAR';

const showConfirmModal = (message: string): ShowConfirmModalAction => ({
  type: SHOW_CONFIRM_MODAL,
  payload: message,
});

const hideConfirmModal = (): HideConfirmModalAction => ({
  type: HIDE_CONFIRM_MODAL,
});

const showSnackbar = (message: string): ShowSnackbarAction => ({
  type: SHOW_SNACKBAR,
  payload: message,
});

const hideSnackbar = (): HideSnackbartAction => ({
  type: HIDE_SNACKBAR,
});

export const snackbarAction = {
  showSnackbar,
  hideSnackbar,
};

export const confirmModalAction = {
  showConfirmModal,
  hideConfirmModal,
};
