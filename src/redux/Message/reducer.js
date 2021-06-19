import { RESET_ERROR_MESSAGE, SET_ERROR_MESSAGE } from './actions';

const messageReducer = (state = '', action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.errorMessage;

    case RESET_ERROR_MESSAGE:
      return '';

    default:
      return state;
  }
};

export default messageReducer;
