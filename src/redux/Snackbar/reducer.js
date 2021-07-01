import { RESET_SNACKBAR, SET_SNACKBAR } from './actions';

const initState = {
  message: { text: '' },
};

const SnackbarReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        message: {
          text: action.snackbarMessage,
        },
      };

    case RESET_SNACKBAR:
      return initState;

    default:
      return state;
  }
};

export default SnackbarReducer;
