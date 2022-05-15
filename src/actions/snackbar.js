import { SNACKBAR_ACTIONS } from './types';

class Snackbar {
  constructor() {
    this.timerId = '';
  }

  pushMessageSnackbar = (message) => (dispatch) => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    dispatch({ type: SNACKBAR_ACTIONS.PUSH_MESSAGE, payload: message });

    this.timerId = setTimeout(() => {
      dispatch({ type: SNACKBAR_ACTIONS.HIDE_MESSAGE });
      this.timerId = null;
    }, 3000);
  };
}

const snackbar = new Snackbar();

export { snackbar };
