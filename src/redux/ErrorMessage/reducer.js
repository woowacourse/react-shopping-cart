import { RESET_ERROR_MESSAGE, SET_ERROR_MESSAGE } from './actions';

const ErrorMessageReducer = (state = '', action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.errorMessage;

    case RESET_ERROR_MESSAGE:
      return '';

    default:
      return state;
  }
};

export default ErrorMessageReducer;
