export const SET_SNACKBAR = 'message/set_snackbar';
export const RESET_SNACKBAR = 'message/reset_snackbar';

export const setSnackbar = (snackbarMessage) => {
  return {
    type: SET_SNACKBAR,
    snackbarMessage,
  };
};

export const resetSnackbar = () => {
  return {
    type: RESET_SNACKBAR,
  };
};
