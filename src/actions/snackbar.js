import { 스낵바_액션 } from './types';

class Snackbar {
  constructor() {
    this.timerId = '';
  }

  pushMessageSnackbar = (message) => (dispatch) => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    dispatch({ type: 스낵바_액션.PUSH_MESSAGE, payload: message });

    this.timerId = setTimeout(() => {
      dispatch({ type: 스낵바_액션.HIDE_MESSAGE });
      this.timerId = null;
    }, 3000);
  };
}

const snackbar = new Snackbar();

export { snackbar };
