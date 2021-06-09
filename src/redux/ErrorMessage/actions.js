export const SET_ERROR_MESSAGE = 'message/set_error_message';
export const RESET_ERROR_MESSAGE = 'message/reset_error_message';

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage,
  };
};

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE,
  };
};
