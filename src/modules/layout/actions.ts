import { HideConfirmModalAction, HideSnackbartAction, ShowConfirmModalAction, ShowSnackbartAction } from './type';

export const SHOW_CONFIRM_MODAL = 'layout/confirmModal/SHOW_CONFIRM_MODAL';
export const HIDE_CONFIRM_MODAL = 'layout/confirmModal/HIDE_CONFIRM_MODAL';

export const SHOW_SNACKBAR = 'layout/snackbar/SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'layout/snackbar/HIDE_SNACKBAR';

export const showConfirmModal = (): ShowConfirmModalAction => ({
  type: SHOW_CONFIRM_MODAL,
});

export const hideConfirmModal = (): HideConfirmModalAction => ({
  type: HIDE_CONFIRM_MODAL,
});

export const showSnackbar = (): ShowSnackbartAction => ({
  type: SHOW_SNACKBAR,
});

export const hideSnackbar = (): HideSnackbartAction => ({
  type: HIDE_SNACKBAR,
});
