const SNACKBAR_ACTION_TYPE = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
};

const updateSnackBar = message => {
  return {
    type: SNACKBAR_ACTION_TYPE.NEW_MESSAGE,
    payload: {
      message,
    },
  };
};

const clearSnackBar = () => {
  return {
    type: SNACKBAR_ACTION_TYPE.CLEAR_MESSAGE,
  };
};

export { updateSnackBar, clearSnackBar, SNACKBAR_ACTION_TYPE };
