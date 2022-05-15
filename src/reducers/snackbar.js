import { SNACKBAR_ACTIONS } from 'actions/types';

const initialState = {
  visible: false,
  message: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SNACKBAR_ACTIONS.PUSH_MESSAGE:
      return { visible: true, message: payload };

    case SNACKBAR_ACTIONS.HIDE_MESSAGE:
      return { visible: false, message: '' };
    default:
      return state;
  }
};
